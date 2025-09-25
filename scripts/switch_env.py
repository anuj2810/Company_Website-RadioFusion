#!/usr/bin/env python3
"""
Environment Switching Script for RadioFusion Global India
This script helps switch between different environment configurations.
"""

import os
import shutil
import sys
from pathlib import Path

def get_project_root():
    """Get the project root directory."""
    return Path(__file__).parent.parent

def switch_environment(env_type):
    """Switch to the specified environment configuration."""
    project_root = get_project_root()
    env_file = project_root / ".env"
    source_env = project_root / f".env.{env_type}"
    
    if not source_env.exists():
        print(f"❌ Environment file .env.{env_type} not found!")
        print(f"Available environments:")
        for env_file_path in project_root.glob(".env.*"):
            if env_file_path.name != ".env.example":
                env_name = env_file_path.name.replace(".env.", "")
                print(f"  - {env_name}")
        return False
    
    # Backup current .env file
    if env_file.exists():
        backup_file = project_root / ".env.backup"
        shutil.copy2(env_file, backup_file)
        print(f"✅ Backed up current .env to .env.backup")
    
    # Copy the new environment file
    shutil.copy2(source_env, env_file)
    print(f"✅ Switched to {env_type} environment")
    print(f"📁 Configuration loaded from .env.{env_type}")
    
    # Show database configuration
    show_db_config(env_file)
    
    return True

def show_db_config(env_file):
    """Show the current database configuration."""
    try:
        with open(env_file, 'r') as f:
            lines = f.readlines()
        
        print("\n📊 Current Database Configuration:")
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
                                print(f"  {var}: postgresql://[username]:[password]@[host]:[port]/[database]")
                            else:
                                print(f"  {var}: {value}")
                        else:
                            print(f"  {var}: {value}")
        print()
    except Exception as e:
        print(f"⚠️  Could not read database configuration: {e}")

def main():
    """Main function."""
    if len(sys.argv) != 2:
        print("🔧 Environment Switching Tool")
        print("Usage: python switch_env.py <environment>")
        print("\nAvailable environments:")
        print("  development  - Local PostgreSQL database")
        print("  production   - Production cloud database")
        print("  cloud        - Azure Database for PostgreSQL")
        print("\nExample: python switch_env.py development")
        return
    
    env_type = sys.argv[1].lower()
    
    if switch_environment(env_type):
        print("\n🚀 Next steps:")
        print("1. Restart your Django development server")
        print("2. Run migrations if switching database types:")
        print("   python manage.py migrate")
        print("3. Create superuser if needed:")
        print("   python manage.py createsuperuser")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()