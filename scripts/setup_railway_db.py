#!/usr/bin/env python3
"""
Railway PostgreSQL Database Setup Script
This script helps configure Railway PostgreSQL for RadioFusion Global India.
Railway is a simpler alternative to Azure for small to medium projects.
"""

import os
import sys
import json
import requests
from pathlib import Path


class RailwayDBSetup:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.railway_api = "https://backboard.railway.app/graphql/v2"
        
    def check_railway_cli(self):
        """Check if Railway CLI is installed."""
        try:
            import subprocess
            result = subprocess.run(['railway', '--version'], capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Railway CLI is installed")
                return True
            else:
                print("❌ Railway CLI is not installed")
                return False
        except FileNotFoundError:
            print("❌ Railway CLI is not installed")
            return False
    
    def install_railway_cli(self):
        """Provide instructions to install Railway CLI."""
        print("\n📥 To install Railway CLI:")
        print("npm install -g @railway/cli")
        print("or")
        print("curl -fsSL https://railway.app/install.sh | sh")
        print("\nAfter installation, run: railway login")
    
    def login_railway(self):
        """Login to Railway."""
        try:
            import subprocess
            print("🔐 Logging into Railway...")
            result = subprocess.run(['railway', 'login'], capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Successfully logged into Railway")
                return True
            else:
                print(f"❌ Failed to login to Railway: {result.stderr}")
                return False
        except Exception as e:
            print(f"❌ Error during Railway login: {e}")
            return False
    
    def create_project(self, project_name):
        """Create a new Railway project."""
        try:
            import subprocess
            print(f"📦 Creating Railway project '{project_name}'...")
            result = subprocess.run([
                'railway', 'project', 'create', project_name
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"✅ Railway project '{project_name}' created successfully")
                return True
            else:
                print(f"❌ Failed to create Railway project: {result.stderr}")
                return False
        except Exception as e:
            print(f"❌ Error creating Railway project: {e}")
            return False
    
    def add_postgresql_service(self):
        """Add PostgreSQL service to Railway project."""
        try:
            import subprocess
            print("🗄️  Adding PostgreSQL service...")
            result = subprocess.run([
                'railway', 'add', '--database', 'postgresql'
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print("✅ PostgreSQL service added successfully")
                return True
            else:
                print(f"❌ Failed to add PostgreSQL service: {result.stderr}")
                return False
        except Exception as e:
            print(f"❌ Error adding PostgreSQL service: {e}")
            return False
    
    def get_database_url(self):
        """Get the database URL from Railway."""
        try:
            import subprocess
            print("🔗 Getting database connection URL...")
            result = subprocess.run([
                'railway', 'variables', '--json'
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                variables = json.loads(result.stdout)
                database_url = variables.get('DATABASE_URL')
                if database_url:
                    print("✅ Database URL retrieved successfully")
                    return database_url
                else:
                    print("❌ DATABASE_URL not found in Railway variables")
                    return None
            else:
                print(f"❌ Failed to get Railway variables: {result.stderr}")
                return None
        except Exception as e:
            print(f"❌ Error getting database URL: {e}")
            return None
    
    def parse_database_url(self, database_url):
        """Parse database URL into components."""
        try:
            from urllib.parse import urlparse
            parsed = urlparse(database_url)
            
            return {
                'host': parsed.hostname,
                'port': parsed.port or 5432,
                'database': parsed.path.lstrip('/'),
                'username': parsed.username,
                'password': parsed.password,
                'connection_string': database_url
            }
        except Exception as e:
            print(f"❌ Error parsing database URL: {e}")
            return None
    
    def update_env_file(self, connection_info):
        """Update .env.cloud file with Railway database configuration."""
        env_cloud_file = self.project_root / ".env.cloud"
        
        if not env_cloud_file.exists():
            print("❌ .env.cloud file not found")
            return False
        
        # Read current content
        with open(env_cloud_file, 'r') as f:
            content = f.read()
        
        # Update database configuration
        lines = content.split('\n')
        updated_lines = []
        
        for line in lines:
            if line.startswith('DB_NAME='):
                updated_lines.append(f"DB_NAME={connection_info['database']}")
            elif line.startswith('DB_USER='):
                updated_lines.append(f"DB_USER={connection_info['username']}")
            elif line.startswith('DB_PASSWORD='):
                updated_lines.append(f"DB_PASSWORD={connection_info['password']}")
            elif line.startswith('DB_HOST='):
                updated_lines.append(f"DB_HOST={connection_info['host']}")
            elif line.startswith('DB_PORT='):
                updated_lines.append(f"DB_PORT={connection_info['port']}")
            elif line.startswith('# DATABASE_URL='):
                updated_lines.append(f"DATABASE_URL={connection_info['connection_string']}")
            else:
                updated_lines.append(line)
        
        # Write updated content
        with open(env_cloud_file, 'w') as f:
            f.write('\n'.join(updated_lines))
        
        print(f"✅ Updated {env_cloud_file.name} with Railway database configuration")
        return True
    
    def display_connection_info(self, connection_info):
        """Display database connection information."""
        print("\n🔗 Database Connection Information:")
        print(f"Host: {connection_info['host']}")
        print(f"Port: {connection_info['port']}")
        print(f"Database: {connection_info['database']}")
        print(f"Username: {connection_info['username']}")
        print(f"Password: {connection_info['password']}")
        print(f"\nConnection String:")
        print(connection_info['connection_string'])


def main():
    """Main function."""
    setup = RailwayDBSetup()
    
    print("🚀 Railway PostgreSQL Database Setup")
    print("=" * 50)
    
    # Check prerequisites
    if not setup.check_railway_cli():
        setup.install_railway_cli()
        print("\nPlease install Railway CLI and run this script again.")
        return
    
    # Login to Railway
    if not setup.login_railway():
        return
    
    # Get project name
    project_name = input("\nEnter Railway project name (e.g., radiofusion-global): ").strip()
    if not project_name:
        print("❌ Project name is required")
        return
    
    print(f"\n🔧 Setting up Railway project...")
    
    # Create project
    if not setup.create_project(project_name):
        print("⚠️  Project might already exist. Continuing...")
    
    # Add PostgreSQL service
    if not setup.add_postgresql_service():
        print("⚠️  PostgreSQL service might already exist. Continuing...")
    
    # Wait for database to be ready
    print("\n⏳ Waiting for database to be ready...")
    print("This may take a few minutes...")
    input("Press Enter when the database is ready (check Railway dashboard)...")
    
    # Get database URL
    database_url = setup.get_database_url()
    if not database_url:
        print("❌ Could not retrieve database URL")
        print("Please check Railway dashboard for DATABASE_URL variable")
        return
    
    # Parse database URL
    connection_info = setup.parse_database_url(database_url)
    if not connection_info:
        return
    
    # Display connection information
    setup.display_connection_info(connection_info)
    
    # Update .env.cloud file
    setup.update_env_file(connection_info)
    
    print("\n✅ Railway PostgreSQL setup completed!")
    print("\n🚀 Next steps:")
    print("1. Switch to cloud environment: python scripts/switch_env.py cloud")
    print("2. Run migrations: python manage.py migrate")
    print("3. Create superuser: python manage.py createsuperuser")
    print("4. Test connection: python manage.py db_status")
    print("\n💡 Railway Tips:")
    print("- Your database is automatically backed up")
    print("- Check Railway dashboard for monitoring and logs")
    print("- Database URL is automatically generated and managed")


if __name__ == "__main__":
    main()