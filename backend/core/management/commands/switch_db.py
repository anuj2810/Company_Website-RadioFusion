"""
Django management command to switch between database configurations.
Usage: python manage.py switch_db <environment>
"""

from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import shutil
from pathlib import Path


class Command(BaseCommand):
    help = 'Switch between different database environments'

    def add_arguments(self, parser):
        parser.add_argument(
            'environment',
            type=str,
            help='Environment to switch to (development, production, cloud)'
        )
        parser.add_argument(
            '--backup',
            action='store_true',
            help='Create backup of current .env file'
        )

    def handle(self, *args, **options):
        environment = options['environment'].lower()
        create_backup = options['backup']
        
        # Get project root (parent of backend directory)
        project_root = Path(settings.BASE_DIR).parent
        env_file = project_root / ".env"
        source_env = project_root / f".env.{environment}"
        
        # Validate environment file exists
        if not source_env.exists():
            available_envs = []
            for env_path in project_root.glob(".env.*"):
                if env_path.name != ".env.example":
                    available_envs.append(env_path.name.replace(".env.", ""))
            
            raise CommandError(
                f"Environment file .env.{environment} not found!\n"
                f"Available environments: {', '.join(available_envs)}"
            )
        
        # Create backup if requested or if switching environments
        if create_backup and env_file.exists():
            backup_file = project_root / ".env.backup"
            shutil.copy2(env_file, backup_file)
            self.stdout.write(
                self.style.SUCCESS(f"✅ Backed up current .env to .env.backup")
            )
        
        # Switch environment
        shutil.copy2(source_env, env_file)
        self.stdout.write(
            self.style.SUCCESS(f"✅ Switched to {environment} environment")
        )
        
        # Show current database configuration
        self._show_db_config(env_file)
        
        # Show next steps
        self.stdout.write(
            self.style.WARNING("\n🚀 Next steps:")
        )
        self.stdout.write("1. Restart your Django development server")
        self.stdout.write("2. Run migrations if switching database types:")
        self.stdout.write("   python manage.py migrate")
        self.stdout.write("3. Create superuser if needed:")
        self.stdout.write("   python manage.py createsuperuser")

    def _show_db_config(self, env_file):
        """Show the current database configuration."""
        try:
            with open(env_file, 'r') as f:
                lines = f.readlines()
            
            self.stdout.write("\n📊 Current Database Configuration:")
            db_vars = ['DB_ENGINE', 'DB_NAME', 'DB_HOST', 'DB_PORT', 'DATABASE_URL']
            
            for line in lines:
                line = line.strip()
                if line and not line.startswith('#'):
                    for var in db_vars:
                        if line.startswith(f"{var}="):
                            value = line.split('=', 1)[1]
                            if var == 'DATABASE_URL' and value:
                                # Mask sensitive parts of DATABASE_URL
                                if 'postgresql://' in value:
                                    self.stdout.write(f"  {var}: postgresql://[username]:[password]@[host]:[port]/[database]")
                                else:
                                    self.stdout.write(f"  {var}: {value}")
                            else:
                                self.stdout.write(f"  {var}: {value}")
        except Exception as e:
            self.stdout.write(
                self.style.WARNING(f"⚠️  Could not read database configuration: {e}")
            )