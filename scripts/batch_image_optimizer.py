#!/usr/bin/env python3
"""
Batch Image Optimizer for RadioFusion Website
Advanced batch processing for converting multiple image directories to WebP format.
"""

import os
import sys
import json
import time
import threading
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Dict, Any
import argparse
from image_optimizer import ImageOptimizer

class BatchImageOptimizer:
    """
    Advanced batch image optimizer with multi-threading and configuration support.
    """
    
    def __init__(self, config_file: str = None):
        """
        Initialize the BatchImageOptimizer.
        
        Args:
            config_file (str): Path to configuration file
        """
        self.config = self.load_config(config_file)
        self.total_stats = {
            'processed': 0,
            'skipped': 0,
            'errors': 0,
            'total_size_before': 0,
            'total_size_after': 0,
            'directories_processed': 0
        }
        self.lock = threading.Lock()
    
    def load_config(self, config_file: str = None) -> Dict[str, Any]:
        """
        Load configuration from file or use defaults.
        
        Args:
            config_file (str): Path to configuration file
            
        Returns:
            Dict[str, Any]: Configuration dictionary
        """
        default_config = {
            "quality": 85,
            "lossless": False,
            "max_workers": 4,
            "recursive": True,
            "preserve_structure": True,
            "create_backup": False,
            "directories": [
                {
                    "input": "frontend/src/assets/images",
                    "output": "frontend/src/assets/images/webp",
                    "quality": 85
                },
                {
                    "input": "frontend/public/images",
                    "output": "frontend/public/images/webp",
                    "quality": 90
                }
            ],
            "exclude_patterns": [
                "*.webp",
                "**/node_modules/**",
                "**/venv/**",
                "**/.git/**"
            ]
        }
        
        if config_file and Path(config_file).exists():
            try:
                with open(config_file, 'r') as f:
                    user_config = json.load(f)
                    default_config.update(user_config)
                    print(f"✅ Loaded configuration from {config_file}")
            except Exception as e:
                print(f"⚠️  Error loading config file: {e}")
                print("Using default configuration")
        
        return default_config
    
    def save_config(self, config_file: str) -> None:
        """
        Save current configuration to file.
        
        Args:
            config_file (str): Path to save configuration
        """
        try:
            with open(config_file, 'w') as f:
                json.dump(self.config, f, indent=2)
            print(f"✅ Configuration saved to {config_file}")
        except Exception as e:
            print(f"❌ Error saving configuration: {e}")
    
    def should_exclude(self, path: Path) -> bool:
        """
        Check if path should be excluded based on patterns.
        
        Args:
            path (Path): Path to check
            
        Returns:
            bool: True if should be excluded
        """
        for pattern in self.config.get('exclude_patterns', []):
            if path.match(pattern):
                return True
        return False
    
    def process_directory_batch(self, directory_config: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a single directory configuration.
        
        Args:
            directory_config (Dict[str, Any]): Directory configuration
            
        Returns:
            Dict[str, Any]: Processing results
        """
        input_dir = Path(directory_config['input'])
        output_dir = Path(directory_config['output'])
        
        # Use directory-specific quality or global quality
        quality = directory_config.get('quality', self.config['quality'])
        lossless = directory_config.get('lossless', self.config['lossless'])
        
        print(f"\n📁 Processing directory: {input_dir}")
        print(f"📤 Output directory: {output_dir}")
        print(f"🎯 Quality: {quality}%, Lossless: {lossless}")
        
        if not input_dir.exists():
            print(f"⚠️  Input directory does not exist: {input_dir}")
            return {'success': False, 'error': 'Directory not found'}
        
        # Initialize optimizer for this directory
        optimizer = ImageOptimizer(quality=quality, lossless=lossless)
        
        # Process directory
        start_time = time.time()
        optimizer.process_directory(input_dir, output_dir, self.config['recursive'])
        end_time = time.time()
        
        # Update total stats
        with self.lock:
            self.total_stats['processed'] += optimizer.stats['processed']
            self.total_stats['skipped'] += optimizer.stats['skipped']
            self.total_stats['errors'] += optimizer.stats['errors']
            self.total_stats['total_size_before'] += optimizer.stats['total_size_before']
            self.total_stats['total_size_after'] += optimizer.stats['total_size_after']
            self.total_stats['directories_processed'] += 1
        
        return {
            'success': True,
            'directory': str(input_dir),
            'stats': optimizer.stats,
            'duration': end_time - start_time
        }
    
    def process_all_directories(self) -> None:
        """Process all directories in configuration."""
        directories = self.config.get('directories', [])
        
        if not directories:
            print("⚠️  No directories configured for processing")
            return
        
        print("🚀 RadioFusion Batch Image Optimizer")
        print("=" * 60)
        print(f"📊 Processing {len(directories)} directories")
        print(f"🧵 Max workers: {self.config['max_workers']}")
        print("=" * 60)
        
        # Check FFmpeg availability
        optimizer = ImageOptimizer()
        if not optimizer.check_ffmpeg():
            sys.exit(1)
        
        start_time = time.time()
        
        # Process directories with threading
        max_workers = min(self.config['max_workers'], len(directories))
        
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            # Submit all directory processing tasks
            future_to_config = {
                executor.submit(self.process_directory_batch, dir_config): dir_config
                for dir_config in directories
            }
            
            # Process completed tasks
            results = []
            for future in as_completed(future_to_config):
                dir_config = future_to_config[future]
                try:
                    result = future.result()
                    results.append(result)
                    
                    if result['success']:
                        print(f"✅ Completed: {result['directory']}")
                    else:
                        print(f"❌ Failed: {dir_config['input']} - {result.get('error', 'Unknown error')}")
                        
                except Exception as e:
                    print(f"❌ Exception processing {dir_config['input']}: {str(e)}")
                    results.append({
                        'success': False,
                        'directory': dir_config['input'],
                        'error': str(e)
                    })
        
        end_time = time.time()
        
        # Print final summary
        self.print_final_summary(end_time - start_time, results)
    
    def print_final_summary(self, total_duration: float, results: List[Dict[str, Any]]) -> None:
        """
        Print final processing summary.
        
        Args:
            total_duration (float): Total processing time
            results (List[Dict[str, Any]]): Processing results
        """
        print("\n" + "=" * 60)
        print("📊 BATCH PROCESSING SUMMARY")
        print("=" * 60)
        
        successful = sum(1 for r in results if r['success'])
        failed = len(results) - successful
        
        print(f"📁 Directories processed: {self.total_stats['directories_processed']}")
        print(f"✅ Successful: {successful}")
        print(f"❌ Failed: {failed}")
        print(f"⏱️  Total duration: {total_duration:.2f} seconds")
        print()
        
        print("📈 IMAGE PROCESSING STATS:")
        print(f"✅ Images processed: {self.total_stats['processed']}")
        print(f"⏭️  Images skipped: {self.total_stats['skipped']}")
        print(f"❌ Processing errors: {self.total_stats['errors']}")
        
        if self.total_stats['total_size_before'] > 0:
            total_reduction = ((self.total_stats['total_size_before'] - self.total_stats['total_size_after']) / 
                             self.total_stats['total_size_before']) * 100
            
            print()
            print("💾 SIZE OPTIMIZATION:")
            print(f"📦 Original total size: {self.total_stats['total_size_before']:,} bytes")
            print(f"📦 Optimized total size: {self.total_stats['total_size_after']:,} bytes")
            print(f"📉 Total size reduction: {total_reduction:.1f}%")
            print(f"💰 Total space saved: {self.total_stats['total_size_before'] - self.total_stats['total_size_after']:,} bytes")
        
        print("\n" + "=" * 60)
        print("🎉 Batch processing completed!")
    
    def create_default_config(self, config_file: str) -> None:
        """
        Create a default configuration file.
        
        Args:
            config_file (str): Path to create configuration file
        """
        self.save_config(config_file)
        print(f"📝 Default configuration created at {config_file}")
        print("Edit this file to customize your batch processing settings.")

def main():
    """Main function to handle command line arguments."""
    parser = argparse.ArgumentParser(
        description="Batch convert images to WebP format for RadioFusion website optimization"
    )
    
    parser.add_argument(
        '-c', '--config',
        type=str,
        default='image_optimizer_config.json',
        help='Configuration file path (default: image_optimizer_config.json)'
    )
    
    parser.add_argument(
        '--create-config',
        action='store_true',
        help='Create a default configuration file'
    )
    
    parser.add_argument(
        '--quality',
        type=int,
        help='Override global quality setting (0-100)'
    )
    
    parser.add_argument(
        '--max-workers',
        type=int,
        help='Override max worker threads'
    )
    
    parser.add_argument(
        '--lossless',
        action='store_true',
        help='Use lossless compression'
    )
    
    args = parser.parse_args()
    
    # Initialize batch optimizer
    batch_optimizer = BatchImageOptimizer(args.config if not args.create_config else None)
    
    # Create default config if requested
    if args.create_config:
        batch_optimizer.create_default_config(args.config)
        return
    
    # Override config with command line arguments
    if args.quality is not None:
        batch_optimizer.config['quality'] = args.quality
    
    if args.max_workers is not None:
        batch_optimizer.config['max_workers'] = args.max_workers
    
    if args.lossless:
        batch_optimizer.config['lossless'] = True
    
    # Process all directories
    batch_optimizer.process_all_directories()

if __name__ == "__main__":
    main()