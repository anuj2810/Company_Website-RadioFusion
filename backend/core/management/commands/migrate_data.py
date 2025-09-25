"""
Django management command to migrate data between databases.
Usage: python manage.py migrate_data --from <source_env> --to <target_env>
"""

from django.core.management.base import BaseCommand, CommandError
from django.core.management import call_command
from django.conf import settings
from django.db import connections
import os
import shutil
import tempfile
from pathlib import Path
import json


class Command(BaseCommand):
    help = 'Migrate data between different database environments'

    def add_arguments(self, parser):
        parser.add_argument(
            '--from',
            dest='source_env',
            type=str,
            required=True,
            help='Source environment (development, production, cloud)'
        )
        parser.add_argument(
            '--to',
            dest='target_env',
            type=str,
            required=True,
            help='Target environment (development, production, cloud)'
        )
        parser.add_argument(
            '--apps',
            type=str,
            nargs='*',
            help='Specific apps to migrate (default: all apps)'
        )
        parser.add_argument(
            '--exclude',
            type=str,
            nargs='*',
            default=['contenttypes', 'auth.permission'],
            help='Apps/models to exclude from migration'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be migrated without actually doing it'
        )

    def handle(self, *args, **options):
        source_env = options['source_env'].lower()
        target_env = options['target_env'].lower()
        apps = options['apps']
        exclude = options['exclude']
        dry_run = options['dry_run']
        
        if source_env == target_env:
            raise CommandError("Source and target environments cannot be the same!")
        
        # Get project root
        project_root = Path(settings.BASE_DIR).parent
        
        # Validate environment files exist
        source_env_file = project_root / f".env.{source_env}"
        target_env_file = project_root / f".env.{target_env}"
        
        if not source_env_file.exists():
            raise CommandError(f"Source environment file .env.{source_env} not found!")
        
        if not target_env_file.exists():
            raise CommandError(f"Target environment file .env.{target_env} not found!")
        
        if dry_run:
            self.stdout.write(
                self.style.WARNING("🔍 DRY RUN MODE - No actual migration will occur")
            )
        
        self.stdout.write(
            self.style.SUCCESS(f"🚀 Starting data migration from {source_env} to {target_env}")
        )
        
        try:
            # Step 1: Export data from source
            self.stdout.write("📤 Step 1: Exporting data from source database...")
            source_data = self._export_data(source_env_file, apps, exclude, dry_run)
            
            if dry_run:
                self.stdout.write(
                    self.style.SUCCESS(f"✅ Would export {len(source_data)} records")
                )
                return
            
            # Step 2: Import data to target
            self.stdout.write("📥 Step 2: Importing data to target database...")
            self._import_data(target_env_file, source_data, dry_run)
            
            self.stdout.write(
                self.style.SUCCESS("✅ Data migration completed successfully!")
            )
            
        except Exception as e:
            raise CommandError(f"Migration failed: {str(e)}")

    def _export_data(self, source_env_file, apps, exclude, dry_run):
        """Export data from source database."""
        # Switch to source environment temporarily
        current_env = Path(settings.BASE_DIR).parent / ".env"
        backup_env = Path(settings.BASE_DIR).parent / ".env.migration_backup"
        
        # Backup current env
        if current_env.exists():
            shutil.copy2(current_env, backup_env)
        
        try:
            # Switch to source environment
            shutil.copy2(source_env_file, current_env)
            
            if dry_run:
                return []
            
            # Create temporary file for data export
            with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as temp_file:
                temp_path = temp_file.name
            
            # Export data using Django's dumpdata command
            dump_args = ['dumpdata']
            if apps:
                dump_args.extend(apps)
            else:
                dump_args.append('--all')
            
            if exclude:
                for exc in exclude:
                    dump_args.extend(['--exclude', exc])
            
            dump_args.extend(['--output', temp_path, '--indent', '2'])
            
            call_command(*dump_args)
            
            # Read exported data
            with open(temp_path, 'r') as f:
                data = json.load(f)
            
            # Clean up temp file
            os.unlink(temp_path)
            
            self.stdout.write(f"✅ Exported {len(data)} records from source database")
            return data
            
        finally:
            # Restore original environment
            if backup_env.exists():
                shutil.copy2(backup_env, current_env)
                os.unlink(backup_env)

    def _import_data(self, target_env_file, data, dry_run):
        """Import data to target database."""
        if dry_run:
            return
        
        # Switch to target environment temporarily
        current_env = Path(settings.BASE_DIR).parent / ".env"
        backup_env = Path(settings.BASE_DIR).parent / ".env.migration_backup"
        
        # Backup current env
        if current_env.exists():
            shutil.copy2(current_env, backup_env)
        
        try:
            # Switch to target environment
            shutil.copy2(target_env_file, current_env)
            
            # Create temporary file for data import
            with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as temp_file:
                json.dump(data, temp_file, indent=2)
                temp_path = temp_file.name
            
            # Import data using Django's loaddata command
            call_command('loaddata', temp_path)
            
            # Clean up temp file
            os.unlink(temp_path)
            
            self.stdout.write(f"✅ Imported {len(data)} records to target database")
            
        finally:
            # Restore original environment
            if backup_env.exists():
                shutil.copy2(backup_env, current_env)
                os.unlink(backup_env)