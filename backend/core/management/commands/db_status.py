"""
Django management command to check database status and configuration.
Usage: python manage.py db_status
"""

from django.core.management.base import BaseCommand
from django.db import connections, connection
from django.conf import settings
import os
from pathlib import Path


class Command(BaseCommand):
    help = 'Check database connection status and configuration'

    def add_arguments(self, parser):
        parser.add_argument(
            '--verbose',
            action='store_true',
            help='Show detailed database information'
        )

    def handle(self, *args, **options):
        verbose = options['verbose']
        
        self.stdout.write(
            self.style.SUCCESS("🔍 Database Status Check")
        )
        self.stdout.write("=" * 50)
        
        # Show current environment
        self._show_current_environment()
        
        # Check database connection
        self._check_database_connection(verbose)
        
        # Show database configuration
        self._show_database_config(verbose)
        
        # Show migration status
        self._show_migration_status()

    def _show_current_environment(self):
        """Show current environment configuration."""
        project_root = Path(settings.BASE_DIR).parent
        env_file = project_root / ".env"
        
        self.stdout.write("\n📁 Environment Configuration:")
        
        if env_file.exists():
            try:
                with open(env_file, 'r') as f:
                    lines = f.readlines()
                
                # Look for DB_ENGINE to determine environment type
                db_engine = None
                for line in lines:
                    line = line.strip()
                    if line.startswith('DB_ENGINE='):
                        db_engine = line.split('=', 1)[1]
                        break
                
                if db_engine:
                    self.stdout.write(f"  Database Engine: {db_engine}")
                else:
                    self.stdout.write("  Database Engine: Not specified (using default)")
                
                # Check which environment file might be active
                for env_type in ['development', 'production', 'cloud']:
                    env_type_file = project_root / f".env.{env_type}"
                    if env_type_file.exists():
                        # Simple check if current .env matches this type
                        with open(env_type_file, 'r') as f:
                            type_content = f.read()
                        with open(env_file, 'r') as f:
                            current_content = f.read()
                        
                        if type_content.strip() == current_content.strip():
                            self.stdout.write(f"  Active Environment: {env_type}")
                            break
                else:
                    self.stdout.write("  Active Environment: custom")
                    
            except Exception as e:
                self.stdout.write(f"  Error reading .env file: {e}")
        else:
            self.stdout.write("  No .env file found")

    def _check_database_connection(self, verbose):
        """Check database connection status."""
        self.stdout.write("\n🔌 Database Connection:")
        
        try:
            # Test connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                result = cursor.fetchone()
            
            if result:
                self.stdout.write(
                    self.style.SUCCESS("  ✅ Database connection successful")
                )
                
                if verbose:
                    # Get database info
                    db_info = connection.get_connection_params()
                    self.stdout.write(f"  Connection params: {db_info}")
                    
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"  ❌ Database connection failed: {e}")
            )

    def _show_database_config(self, verbose):
        """Show database configuration."""
        self.stdout.write("\n⚙️  Database Configuration:")
        
        db_config = settings.DATABASES['default']
        
        # Show basic config
        self.stdout.write(f"  Engine: {db_config.get('ENGINE', 'Not specified')}")
        self.stdout.write(f"  Name: {db_config.get('NAME', 'Not specified')}")
        self.stdout.write(f"  Host: {db_config.get('HOST', 'Not specified')}")
        self.stdout.write(f"  Port: {db_config.get('PORT', 'Not specified')}")
        self.stdout.write(f"  User: {db_config.get('USER', 'Not specified')}")
        
        if verbose:
            # Show additional config
            options = db_config.get('OPTIONS', {})
            if options:
                self.stdout.write(f"  Options: {options}")
            
            conn_max_age = db_config.get('CONN_MAX_AGE', 0)
            self.stdout.write(f"  Connection Max Age: {conn_max_age}")
            
            conn_health_checks = db_config.get('CONN_HEALTH_CHECKS', False)
            self.stdout.write(f"  Connection Health Checks: {conn_health_checks}")

    def _show_migration_status(self):
        """Show migration status."""
        self.stdout.write("\n📋 Migration Status:")
        
        try:
            from django.db.migrations.executor import MigrationExecutor
            from django.db.migrations.loader import MigrationLoader
            
            executor = MigrationExecutor(connection)
            loader = MigrationLoader(connection)
            
            # Get applied migrations
            applied_migrations = executor.loader.applied_migrations
            
            # Get all migrations
            all_migrations = set()
            for app_name, migrations in loader.disk_migrations.items():
                for migration_name in migrations:
                    all_migrations.add((app_name, migration_name))
            
            # Calculate pending migrations
            pending_migrations = all_migrations - applied_migrations
            
            self.stdout.write(f"  Applied migrations: {len(applied_migrations)}")
            self.stdout.write(f"  Pending migrations: {len(pending_migrations)}")
            
            if pending_migrations:
                self.stdout.write(
                    self.style.WARNING("  ⚠️  You have unapplied migrations!")
                )
                self.stdout.write("  Run: python manage.py migrate")
            else:
                self.stdout.write(
                    self.style.SUCCESS("  ✅ All migrations are up to date")
                )
                
        except Exception as e:
            self.stdout.write(f"  Error checking migrations: {e}")
        
        self.stdout.write("\n" + "=" * 50)