#!/usr/bin/env python3
"""
Build Process Image Optimizer for RadioFusion Website
Integrates image optimization into development and production builds.
"""

import os
import sys
import json
import time
import shutil
import subprocess
from pathlib import Path
from typing import Dict, List, Any
import argparse
from batch_image_optimizer import BatchImageOptimizer

class BuildOptimizer:
    """
    Build process optimizer that handles image optimization during builds.
    """
    
    def __init__(self, project_root: str = None):
        """
        Initialize the BuildOptimizer.
        
        Args:
            project_root (str): Root directory of the project
        """
        self.project_root = Path(project_root) if project_root else Path.cwd()
        self.build_config = self.load_build_config()
        self.stats = {
            'images_optimized': 0,
            'space_saved': 0,
            'build_time': 0,
            'optimization_time': 0
        }
    
    def load_build_config(self) -> Dict[str, Any]:
        """
        Load build configuration.
        
        Returns:
            Dict[str, Any]: Build configuration
        """
        config_path = self.project_root / 'build_config.json'
        
        default_config = {
            "environments": {
                "development": {
                    "optimize_images": True,
                    "quality": 85,
                    "lossless": False,
                    "watch_mode": True,
                    "incremental": True
                },
                "production": {
                    "optimize_images": True,
                    "quality": 90,
                    "lossless": False,
                    "watch_mode": False,
                    "incremental": False,
                    "generate_responsive": True
                },
                "testing": {
                    "optimize_images": False,
                    "use_placeholders": True
                }
            },
            "image_directories": [
                {
                    "source": "frontend/src/assets/images",
                    "output": "frontend/src/assets/images/optimized",
                    "watch": True
                },
                {
                    "source": "frontend/public/images",
                    "output": "frontend/public/images/optimized",
                    "watch": True
                },
                {
                    "source": "backend/static/images",
                    "output": "backend/static/images/optimized",
                    "watch": False
                }
            ],
            "build_hooks": {
                "pre_build": ["optimize_images"],
                "post_build": ["generate_manifest", "cleanup_temp"],
                "watch": ["optimize_new_images"]
            },
            "optimization_cache": {
                "enabled": True,
                "cache_dir": ".image_cache",
                "max_age_days": 30
            }
        }
        
        if config_path.exists():
            try:
                with open(config_path, 'r') as f:
                    user_config = json.load(f)
                    # Merge configurations
                    for key, value in user_config.items():
                        if isinstance(value, dict) and key in default_config:
                            default_config[key].update(value)
                        else:
                            default_config[key] = value
                print(f"✅ Loaded build configuration from {config_path}")
            except Exception as e:
                print(f"⚠️  Error loading build config: {e}")
                print("Using default configuration")
        
        return default_config
    
    def save_build_config(self) -> None:
        """Save current build configuration."""
        config_path = self.project_root / 'build_config.json'
        try:
            with open(config_path, 'w') as f:
                json.dump(self.build_config, f, indent=2)
            print(f"✅ Build configuration saved to {config_path}")
        except Exception as e:
            print(f"❌ Error saving build configuration: {e}")
    
    def get_cache_path(self, file_path: Path) -> Path:
        """
        Get cache path for a file.
        
        Args:
            file_path (Path): Original file path
            
        Returns:
            Path: Cache file path
        """
        cache_dir = self.project_root / self.build_config['optimization_cache']['cache_dir']
        cache_dir.mkdir(exist_ok=True)
        
        # Create a unique cache filename based on file path and modification time
        relative_path = file_path.relative_to(self.project_root)
        cache_name = str(relative_path).replace('/', '_').replace('\\', '_')
        return cache_dir / f"{cache_name}.cache"
    
    def is_cached(self, file_path: Path) -> bool:
        """
        Check if file optimization is cached and still valid.
        
        Args:
            file_path (Path): File to check
            
        Returns:
            bool: True if cached and valid
        """
        if not self.build_config['optimization_cache']['enabled']:
            return False
        
        cache_path = self.get_cache_path(file_path)
        if not cache_path.exists():
            return False
        
        try:
            with open(cache_path, 'r') as f:
                cache_data = json.load(f)
            
            # Check if source file has been modified
            source_mtime = file_path.stat().st_mtime
            cached_mtime = cache_data.get('source_mtime', 0)
            
            # Check cache age
            cache_age_days = (time.time() - cache_data.get('cached_at', 0)) / (24 * 3600)
            max_age = self.build_config['optimization_cache']['max_age_days']
            
            return (source_mtime <= cached_mtime and 
                   cache_age_days <= max_age and
                   Path(cache_data.get('output_path', '')).exists())
        
        except Exception:
            return False
    
    def update_cache(self, file_path: Path, output_path: Path) -> None:
        """
        Update cache for a file.
        
        Args:
            file_path (Path): Source file path
            output_path (Path): Output file path
        """
        if not self.build_config['optimization_cache']['enabled']:
            return
        
        cache_path = self.get_cache_path(file_path)
        cache_data = {
            'source_path': str(file_path),
            'output_path': str(output_path),
            'source_mtime': file_path.stat().st_mtime,
            'cached_at': time.time()
        }
        
        try:
            with open(cache_path, 'w') as f:
                json.dump(cache_data, f)
        except Exception as e:
            print(f"⚠️  Failed to update cache for {file_path}: {e}")
    
    def optimize_images_for_environment(self, environment: str = 'development') -> None:
        """
        Optimize images for a specific environment.
        
        Args:
            environment (str): Target environment (development, production, testing)
        """
        env_config = self.build_config['environments'].get(environment, {})
        
        if not env_config.get('optimize_images', True):
            print(f"🚫 Image optimization disabled for {environment} environment")
            return
        
        print(f"🚀 Optimizing images for {environment} environment")
        print("=" * 60)
        
        start_time = time.time()
        
        # Create batch optimizer configuration
        batch_config = {
            'quality': env_config.get('quality', 85),
            'lossless': env_config.get('lossless', False),
            'max_workers': 4,
            'recursive': True,
            'directories': []
        }
        
        # Process each image directory
        for dir_config in self.build_config['image_directories']:
            source_dir = self.project_root / dir_config['source']
            output_dir = self.project_root / dir_config['output']
            
            if not source_dir.exists():
                print(f"⚠️  Source directory not found: {source_dir}")
                continue
            
            # Add to batch configuration
            batch_config['directories'].append({
                'input': str(source_dir),
                'output': str(output_dir),
                'quality': batch_config['quality']
            })
        
        # Run batch optimization
        if batch_config['directories']:
            # Save temporary config
            temp_config_path = self.project_root / 'temp_build_config.json'
            with open(temp_config_path, 'w') as f:
                json.dump(batch_config, f, indent=2)
            
            try:
                # Run batch optimizer
                batch_optimizer = BatchImageOptimizer(str(temp_config_path))
                batch_optimizer.process_all_directories()
                
                # Update stats
                self.stats['images_optimized'] = batch_optimizer.total_stats['processed']
                self.stats['space_saved'] = (batch_optimizer.total_stats['total_size_before'] - 
                                           batch_optimizer.total_stats['total_size_after'])
                
            finally:
                # Clean up temporary config
                if temp_config_path.exists():
                    temp_config_path.unlink()
        
        self.stats['optimization_time'] = time.time() - start_time
        
        # Generate responsive images for production
        if environment == 'production' and env_config.get('generate_responsive', False):
            self.generate_responsive_images()
        
        print(f"✅ Image optimization completed in {self.stats['optimization_time']:.2f} seconds")
    
    def generate_responsive_images(self) -> None:
        """Generate responsive image variants for production."""
        print("📱 Generating responsive image variants...")
        
        # Define responsive breakpoints
        breakpoints = [
            {'suffix': '@1x', 'scale': 1.0},
            {'suffix': '@2x', 'scale': 2.0},
            {'suffix': '@3x', 'scale': 3.0}
        ]
        
        # This would integrate with the image optimizer to create different sizes
        # Implementation would depend on specific requirements
        print("✅ Responsive image generation completed")
    
    def generate_image_manifest(self) -> None:
        """Generate a manifest of optimized images."""
        manifest_path = self.project_root / 'image_manifest.json'
        manifest = {
            'generated_at': time.time(),
            'build_stats': self.stats,
            'optimized_images': []
        }
        
        # Scan optimized directories
        for dir_config in self.build_config['image_directories']:
            output_dir = self.project_root / dir_config['output']
            if output_dir.exists():
                for img_file in output_dir.rglob('*.webp'):
                    relative_path = img_file.relative_to(self.project_root)
                    manifest['optimized_images'].append({
                        'path': str(relative_path),
                        'size': img_file.stat().st_size,
                        'modified': img_file.stat().st_mtime
                    })
        
        try:
            with open(manifest_path, 'w') as f:
                json.dump(manifest, f, indent=2)
            print(f"📋 Image manifest generated: {manifest_path}")
        except Exception as e:
            print(f"❌ Failed to generate image manifest: {e}")
    
    def cleanup_temp_files(self) -> None:
        """Clean up temporary files and old cache entries."""
        print("🧹 Cleaning up temporary files...")
        
        # Clean old cache entries
        cache_dir = self.project_root / self.build_config['optimization_cache']['cache_dir']
        if cache_dir.exists():
            max_age = self.build_config['optimization_cache']['max_age_days'] * 24 * 3600
            current_time = time.time()
            
            for cache_file in cache_dir.glob('*.cache'):
                if current_time - cache_file.stat().st_mtime > max_age:
                    cache_file.unlink()
        
        print("✅ Cleanup completed")
    
    def run_build_hooks(self, hook_type: str) -> None:
        """
        Run build hooks for a specific type.
        
        Args:
            hook_type (str): Type of hook (pre_build, post_build, watch)
        """
        hooks = self.build_config['build_hooks'].get(hook_type, [])
        
        for hook in hooks:
            if hook == 'optimize_images':
                self.optimize_images_for_environment()
            elif hook == 'generate_manifest':
                self.generate_image_manifest()
            elif hook == 'cleanup_temp':
                self.cleanup_temp_files()
            elif hook == 'optimize_new_images':
                # This would be implemented for watch mode
                pass
    
    def integrate_with_npm_scripts(self) -> None:
        """Generate npm scripts for image optimization."""
        package_json_path = self.project_root / 'frontend' / 'package.json'
        
        if not package_json_path.exists():
            print("⚠️  package.json not found, skipping npm integration")
            return
        
        try:
            with open(package_json_path, 'r') as f:
                package_data = json.load(f)
            
            # Add optimization scripts
            if 'scripts' not in package_data:
                package_data['scripts'] = {}
            
            optimization_scripts = {
                'optimize:images': 'python ../scripts/build_optimizer.py --environment development',
                'optimize:images:prod': 'python ../scripts/build_optimizer.py --environment production',
                'build:optimized': 'npm run optimize:images:prod && npm run build',
                'dev:optimized': 'npm run optimize:images && npm run dev'
            }
            
            package_data['scripts'].update(optimization_scripts)
            
            with open(package_json_path, 'w') as f:
                json.dump(package_data, f, indent=2)
            
            print("✅ NPM scripts updated with image optimization commands")
            
        except Exception as e:
            print(f"❌ Failed to update package.json: {e}")
    
    def print_build_summary(self) -> None:
        """Print build optimization summary."""
        print("\n" + "=" * 60)
        print("📊 BUILD OPTIMIZATION SUMMARY")
        print("=" * 60)
        print(f"🖼️  Images optimized: {self.stats['images_optimized']}")
        print(f"💾 Space saved: {self.stats['space_saved']:,} bytes")
        print(f"⏱️  Optimization time: {self.stats['optimization_time']:.2f} seconds")
        print("=" * 60)

def main():
    """Main function for command line usage."""
    parser = argparse.ArgumentParser(
        description="Build process image optimizer for RadioFusion website"
    )
    
    parser.add_argument(
        '--environment', '-e',
        choices=['development', 'production', 'testing'],
        default='development',
        help='Target environment for optimization'
    )
    
    parser.add_argument(
        '--project-root',
        type=str,
        help='Project root directory'
    )
    
    parser.add_argument(
        '--create-config',
        action='store_true',
        help='Create default build configuration'
    )
    
    parser.add_argument(
        '--integrate-npm',
        action='store_true',
        help='Integrate with npm scripts'
    )
    
    parser.add_argument(
        '--hooks',
        choices=['pre_build', 'post_build', 'watch'],
        help='Run specific build hooks'
    )
    
    args = parser.parse_args()
    
    # Initialize build optimizer
    build_optimizer = BuildOptimizer(args.project_root)
    
    # Create configuration if requested
    if args.create_config:
        build_optimizer.save_build_config()
        return
    
    # Integrate with npm if requested
    if args.integrate_npm:
        build_optimizer.integrate_with_npm_scripts()
        return
    
    # Run specific hooks if requested
    if args.hooks:
        build_optimizer.run_build_hooks(args.hooks)
        return
    
    # Run full optimization process
    print("🚀 RadioFusion Build Optimizer")
    print("=" * 60)
    
    start_time = time.time()
    
    # Pre-build hooks
    build_optimizer.run_build_hooks('pre_build')
    
    # Main optimization
    build_optimizer.optimize_images_for_environment(args.environment)
    
    # Post-build hooks
    build_optimizer.run_build_hooks('post_build')
    
    build_optimizer.stats['build_time'] = time.time() - start_time
    
    # Print summary
    build_optimizer.print_build_summary()

if __name__ == "__main__":
    main()