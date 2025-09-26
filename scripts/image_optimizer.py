#!/usr/bin/env python3
"""
Image Optimizer Script for RadioFusion Website
Converts images to WebP format using FFmpeg for faster loading times.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Tuple
import json
import time

class ImageOptimizer:
    """
    A class to optimize images by converting them to WebP format using FFmpeg.
    """
    
    # Supported input formats
    SUPPORTED_FORMATS = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.gif'}
    
    def __init__(self, quality: int = 85, lossless: bool = False):
        """
        Initialize the ImageOptimizer.
        
        Args:
            quality (int): WebP quality (0-100, default: 85)
            lossless (bool): Use lossless compression (default: False)
        """
        self.quality = quality
        self.lossless = lossless
        self.stats = {
            'processed': 0,
            'skipped': 0,
            'errors': 0,
            'total_size_before': 0,
            'total_size_after': 0
        }
    
    def check_ffmpeg(self) -> bool:
        """
        Check if FFmpeg is installed and available.
        
        Returns:
            bool: True if FFmpeg is available, False otherwise
        """
        try:
            result = subprocess.run(['ffmpeg', '-version'], 
                                capture_output=True, text=True, check=True)
            print("✅ FFmpeg is available")
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ FFmpeg is not installed or not in PATH")
            print("Please install FFmpeg from: https://ffmpeg.org/download.html")
            return False
    
    def get_file_size(self, file_path: Path) -> int:
        """Get file size in bytes."""
        try:
            return file_path.stat().st_size
        except OSError:
            return 0
    
    def convert_to_webp(self, input_path: Path, output_path: Path) -> bool:
        """
        Convert an image to WebP format using FFmpeg.
        
        Args:
            input_path (Path): Path to input image
            output_path (Path): Path to output WebP image
            
        Returns:
            bool: True if conversion successful, False otherwise
        """
        try:
            # Build FFmpeg command
            cmd = ['ffmpeg', '-i', str(input_path), '-y']  # -y to overwrite
            
            if self.lossless:
                cmd.extend(['-lossless', '1'])
            else:
                cmd.extend(['-quality', str(self.quality)])
            
            # Add WebP specific options
            cmd.extend([
                '-compression_level', '6',  # Compression effort (0-6)
                '-preset', 'default',       # Encoding preset
                str(output_path)
            ])
            
            # Run FFmpeg
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            return True
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Error converting {input_path.name}: {e.stderr}")
            return False
        except Exception as e:
            print(f"❌ Unexpected error converting {input_path.name}: {str(e)}")
            return False
    
    def process_image(self, input_path: Path, output_dir: Path, preserve_structure: bool = True) -> bool:
        """
        Process a single image file.
        
        Args:
            input_path (Path): Path to input image
            output_dir (Path): Output directory
            preserve_structure (bool): Preserve directory structure
            
        Returns:
            bool: True if processing successful, False otherwise
        """
        if input_path.suffix.lower() not in self.SUPPORTED_FORMATS:
            print(f"⚠️  Skipping unsupported format: {input_path.name}")
            self.stats['skipped'] += 1
            return False
        
        # Calculate output path
        if preserve_structure:
            # Preserve relative path structure
            rel_path = input_path.relative_to(input_path.parents[len(input_path.parents)-1])
            output_path = output_dir / rel_path.with_suffix('.webp')
        else:
            # Flat structure
            output_path = output_dir / f"{input_path.stem}.webp"
        
        # Create output directory if it doesn't exist
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Skip if WebP already exists and is newer
        if output_path.exists():
            input_mtime = input_path.stat().st_mtime
            output_mtime = output_path.stat().st_mtime
            if output_mtime > input_mtime:
                print(f"⏭️  Skipping {input_path.name} (WebP is newer)")
                self.stats['skipped'] += 1
                return True
        
        # Get original file size
        original_size = self.get_file_size(input_path)
        
        print(f"🔄 Converting {input_path.name}...")
        
        # Convert to WebP
        if self.convert_to_webp(input_path, output_path):
            # Get new file size
            new_size = self.get_file_size(output_path)
            
            # Calculate compression ratio
            if original_size > 0:
                compression_ratio = ((original_size - new_size) / original_size) * 100
                print(f"✅ {input_path.name} -> {output_path.name}")
                print(f"   Size: {original_size:,} bytes -> {new_size:,} bytes ({compression_ratio:.1f}% reduction)")
            
            # Update stats
            self.stats['processed'] += 1
            self.stats['total_size_before'] += original_size
            self.stats['total_size_after'] += new_size
            
            return True
        else:
            self.stats['errors'] += 1
            return False
    
    def process_directory(self, input_dir: Path, output_dir: Path, recursive: bool = True) -> None:
        """
        Process all images in a directory.
        
        Args:
            input_dir (Path): Input directory
            output_dir (Path): Output directory
            recursive (bool): Process subdirectories recursively
        """
        if not input_dir.exists():
            print(f"❌ Input directory does not exist: {input_dir}")
            return
        
        # Create output directory
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Find all image files
        pattern = "**/*" if recursive else "*"
        image_files = []
        
        for file_path in input_dir.glob(pattern):
            if file_path.is_file() and file_path.suffix.lower() in self.SUPPORTED_FORMATS:
                image_files.append(file_path)
        
        if not image_files:
            print(f"⚠️  No supported image files found in {input_dir}")
            return
        
        print(f"📁 Found {len(image_files)} image files to process")
        print(f"🎯 Quality: {self.quality}%, Lossless: {self.lossless}")
        print("-" * 50)
        
        # Process each image
        start_time = time.time()
        
        for i, image_path in enumerate(image_files, 1):
            print(f"[{i}/{len(image_files)}] ", end="")
            self.process_image(image_path, output_dir)
        
        # Print summary
        end_time = time.time()
        self.print_summary(end_time - start_time)
    
    def print_summary(self, duration: float) -> None:
        """Print processing summary."""
        print("\n" + "=" * 50)
        print("📊 PROCESSING SUMMARY")
        print("=" * 50)
        print(f"✅ Processed: {self.stats['processed']} files")
        print(f"⏭️  Skipped: {self.stats['skipped']} files")
        print(f"❌ Errors: {self.stats['errors']} files")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        
        if self.stats['total_size_before'] > 0:
            total_reduction = ((self.stats['total_size_before'] - self.stats['total_size_after']) / 
                             self.stats['total_size_before']) * 100
            
            print(f"💾 Original size: {self.stats['total_size_before']:,} bytes")
            print(f"💾 Optimized size: {self.stats['total_size_after']:,} bytes")
            print(f"📉 Total reduction: {total_reduction:.1f}%")
            print(f"💰 Space saved: {self.stats['total_size_before'] - self.stats['total_size_after']:,} bytes")

def main():
    """Main function to handle command line arguments."""
    parser = argparse.ArgumentParser(
        description="Convert images to WebP format using FFmpeg for faster website loading"
    )
    
    parser.add_argument(
        'input_path',
        type=str,
        help='Input file or directory path'
    )
    
    parser.add_argument(
        'output_path',
        type=str,
        help='Output directory path'
    )
    
    parser.add_argument(
        '-q', '--quality',
        type=int,
        default=85,
        help='WebP quality (0-100, default: 85)'
    )
    
    parser.add_argument(
        '-l', '--lossless',
        action='store_true',
        help='Use lossless compression'
    )
    
    parser.add_argument(
        '-r', '--recursive',
        action='store_true',
        default=True,
        help='Process subdirectories recursively (default: True)'
    )
    
    args = parser.parse_args()
    
    # Validate paths
    input_path = Path(args.input_path)
    output_path = Path(args.output_path)
    
    # Initialize optimizer
    optimizer = ImageOptimizer(quality=args.quality, lossless=args.lossless)
    
    # Check FFmpeg availability
    if not optimizer.check_ffmpeg():
        sys.exit(1)
    
    print("🚀 RadioFusion Image Optimizer")
    print("=" * 50)
    
    # Process input
    if input_path.is_file():
        # Single file
        print(f"📄 Processing single file: {input_path.name}")
        optimizer.process_image(input_path, output_path, preserve_structure=False)
        optimizer.print_summary(0)
    elif input_path.is_dir():
        # Directory
        print(f"📁 Processing directory: {input_path}")
        optimizer.process_directory(input_path, output_path, recursive=args.recursive)
    else:
        print(f"❌ Input path does not exist: {input_path}")
        sys.exit(1)

if __name__ == "__main__":
    main()