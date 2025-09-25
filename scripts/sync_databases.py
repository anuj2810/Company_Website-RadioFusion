#!/usr/bin/env python3
"""
Database Synchronization Script for RadioFusion Global India
This script helps sync data between different database environments.
"""

import os
import sys
import json
import subprocess
import tempfile
import shutil
from pathlib import Path
from datetime import datetime


class DatabaseSyncer:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.backend_dir = self.project_root / "backend"
        self.manage_py = self.backend_dir / "manage.py"
        
    def get_available_environments(self):
        """Get list of available environment configurations."""
        environments = []
        for env_file in self.project_root.glob(".env.*"):
            if env_file.name != ".env.example":
                env_name = env_file.name.replace(".env.", "")
                environments.append(env_name)
        return environments
    
    def backup_current_env(self):
        """Create backup of current .env file."""
        env_file = self.project_root / ".env"
        if env_file.exists():
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            backup_file = self.project_root / f".env.backup_{timestamp}"
            shutil.copy2(env_file, backup_file)
            print(f"✅ Created backup: {backup_file.name}")
            return backup_file
        return None
    
    def switch_environment(self, env_name):
        """Switch to specified environment."""
        env_file = self.project_root / ".env"
        source_env = self.project_root / f".env.{env_name}"
        
        if not source_env.exists():
            raise FileNotFoundError(f"Environment file .env.{env_name} not found!")
        
        shutil.copy2(source_env, env_file)
        print(f"✅ Switched to {env_name} environment")
    
    def test_database_connection(self, env_name):
        """Test database connection for given environment."""
        print(f"🔍 Testing {env_name} database connection...")
        
        # Switch to environment temporarily
        original_backup = self.backup_current_env()
        
        try:
            self.switch_environment(env_name)
            
            # Test connection using Django management command
            result = subprocess.run([
                sys.executable, str(self.manage_py), "db_status"
            ], cwd=self.backend_dir, capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"✅ {env_name} database connection successful")
                return True
            else:
                print(f"❌ {env_name} database connection failed:")
                print(result.stderr)
                return False
                
        finally:
            # Restore original environment
            if original_backup:
                shutil.copy2(original_backup, self.project_root / ".env")
                original_backup.unlink()
    
    def export_data(self, env_name, apps=None, exclude=None):
        """Export data from specified environment."""
        print(f"📤 Exporting data from {env_name} environment...")
        
        # Switch to source environment
        original_backup = self.backup_current_env()
        
        try:
            self.switch_environment(env_name)
            
            # Create temporary file for export
            with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as temp_file:
                temp_path = temp_file.name
            
            # Build dumpdata command
            cmd = [sys.executable, str(self.manage_py), "dumpdata"]
            
            if apps:
                cmd.extend(apps)
            else:
                cmd.append("--all")
            
            # Default exclusions
            default_exclude = [
                'contenttypes',
                'auth.permission',
                'admin.logentry',
                'sessions.session'
            ]
            
            if exclude:
                default_exclude.extend(exclude)
            
            for exc in default_exclude:
                cmd.extend(["--exclude", exc])
            
            cmd.extend(["--output", temp_path, "--indent", "2"])
            
            # Execute export
            result = subprocess.run(cmd, cwd=self.backend_dir, capture_output=True, text=True)
            
            if result.returncode != 0:
                raise Exception(f"Export failed: {result.stderr}")
            
            # Read exported data
            with open(temp_path, 'r') as f:
                data = json.load(f)
            
            # Clean up temp file
            os.unlink(temp_path)
            
            print(f"✅ Exported {len(data)} records from {env_name}")
            return data
            
        finally:
            # Restore original environment
            if original_backup:
                shutil.copy2(original_backup, self.project_root / ".env")
                original_backup.unlink()
    
    def import_data(self, env_name, data):
        """Import data to specified environment."""
        print(f"📥 Importing data to {env_name} environment...")
        
        # Switch to target environment
        original_backup = self.backup_current_env()
        
        try:
            self.switch_environment(env_name)
            
            # Create temporary file for import
            with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as temp_file:
                json.dump(data, temp_file, indent=2)
                temp_path = temp_file.name
            
            # Execute import
            result = subprocess.run([
                sys.executable, str(self.manage_py), "loaddata", temp_path
            ], cwd=self.backend_dir, capture_output=True, text=True)
            
            # Clean up temp file
            os.unlink(temp_path)
            
            if result.returncode != 0:
                raise Exception(f"Import failed: {result.stderr}")
            
            print(f"✅ Imported {len(data)} records to {env_name}")
            
        finally:
            # Restore original environment
            if original_backup:
                shutil.copy2(original_backup, self.project_root / ".env")
                original_backup.unlink()
    
    def sync_databases(self, source_env, target_env, apps=None, exclude=None, dry_run=False):
        """Sync data from source to target environment."""
        print(f"🚀 Starting database sync: {source_env} → {target_env}")
        
        if source_env == target_env:
            raise ValueError("Source and target environments cannot be the same!")
        
        # Validate environments exist
        available_envs = self.get_available_environments()
        if source_env not in available_envs:
            raise ValueError(f"Source environment '{source_env}' not found!")
        if target_env not in available_envs:
            raise ValueError(f"Target environment '{target_env}' not found!")
        
        if dry_run:
            print("🔍 DRY RUN MODE - No actual sync will occur")
        
        # Test connections
        if not self.test_database_connection(source_env):
            raise Exception(f"Cannot connect to source database ({source_env})")
        
        if not self.test_database_connection(target_env):
            raise Exception(f"Cannot connect to target database ({target_env})")
        
        if dry_run:
            print("✅ Dry run completed - both databases are accessible")
            return
        
        # Export data from source
        data = self.export_data(source_env, apps, exclude)
        
        # Import data to target
        self.import_data(target_env, data)
        
        print("✅ Database sync completed successfully!")


def main():
    """Main function."""
    syncer = DatabaseSyncer()
    
    if len(sys.argv) < 2:
        print("🔄 Database Synchronization Tool")
        print("Usage: python sync_databases.py <command> [options]")
        print("\nCommands:")
        print("  list                     - List available environments")
        print("  test <env>              - Test database connection")
        print("  sync <source> <target>  - Sync data from source to target")
        print("\nOptions for sync:")
        print("  --apps app1 app2        - Sync specific apps only")
        print("  --exclude model1 model2 - Exclude specific models")
        print("  --dry-run              - Test sync without actual data transfer")
        print("\nExamples:")
        print("  python sync_databases.py list")
        print("  python sync_databases.py test development")
        print("  python sync_databases.py sync development cloud")
        print("  python sync_databases.py sync development production --dry-run")
        return
    
    command = sys.argv[1].lower()
    
    try:
        if command == "list":
            envs = syncer.get_available_environments()
            print("📋 Available environments:")
            for env in envs:
                print(f"  - {env}")
        
        elif command == "test":
            if len(sys.argv) < 3:
                print("❌ Please specify environment to test")
                return
            env_name = sys.argv[2]
            syncer.test_database_connection(env_name)
        
        elif command == "sync":
            if len(sys.argv) < 4:
                print("❌ Please specify source and target environments")
                return
            
            source_env = sys.argv[2]
            target_env = sys.argv[3]
            
            # Parse additional options
            apps = None
            exclude = None
            dry_run = False
            
            i = 4
            while i < len(sys.argv):
                if sys.argv[i] == "--apps" and i + 1 < len(sys.argv):
                    apps = []
                    i += 1
                    while i < len(sys.argv) and not sys.argv[i].startswith("--"):
                        apps.append(sys.argv[i])
                        i += 1
                elif sys.argv[i] == "--exclude" and i + 1 < len(sys.argv):
                    exclude = []
                    i += 1
                    while i < len(sys.argv) and not sys.argv[i].startswith("--"):
                        exclude.append(sys.argv[i])
                        i += 1
                elif sys.argv[i] == "--dry-run":
                    dry_run = True
                    i += 1
                else:
                    i += 1
            
            syncer.sync_databases(source_env, target_env, apps, exclude, dry_run)
        
        else:
            print(f"❌ Unknown command: {command}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()