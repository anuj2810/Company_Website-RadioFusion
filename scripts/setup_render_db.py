#!/usr/bin/env python3
"""
Render PostgreSQL Database Setup Script
This script helps configure Render PostgreSQL for RadioFusion Global India.
Render is another simple cloud platform alternative.
"""

import os
import sys
import json
import requests
from pathlib import Path


class RenderDBSetup:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        
    def display_manual_setup_instructions(self):
        """Display manual setup instructions for Render."""
        print("\n📋 Render PostgreSQL Manual Setup Instructions:")
        print("=" * 60)
        
        print("\n1. 🌐 Go to Render Dashboard:")
        print("   https://dashboard.render.com/")
        
        print("\n2. 🔐 Sign up or log in to your Render account")
        
        print("\n3. ➕ Create a new PostgreSQL database:")
        print("   - Click 'New +' button")
        print("   - Select 'PostgreSQL'")
        print("   - Fill in the details:")
        print("     * Name: radiofusion-db (or your preferred name)")
        print("     * Database: radiofusion_prod")
        print("     * User: (will be auto-generated)")
        print("     * Region: Choose closest to your users")
        print("     * PostgreSQL Version: 15 (recommended)")
        print("     * Plan: Free tier for development")
        
        print("\n4. 📋 After creation, copy the connection details:")
        print("   - Internal Database URL")
        print("   - External Database URL")
        print("   - Host")
        print("   - Port")
        print("   - Database")
        print("   - Username")
        print("   - Password")
        
        print("\n5. 🔧 Configure your application:")
        print("   - Use External Database URL for connections from outside Render")
        print("   - Use Internal Database URL for connections from Render services")
        
        print("\n⚠️  Important Notes:")
        print("   - Free tier databases sleep after 90 days of inactivity")
        print("   - Free tier has connection limits")
        print("   - Upgrade to paid plan for production use")
        
    def get_connection_details_from_user(self):
        """Get database connection details from user input."""
        print("\n🔗 Enter your Render PostgreSQL connection details:")
        print("(You can find these in your Render dashboard)")
        
        host = input("Database Host: ").strip()
        port = input("Database Port (default 5432): ").strip() or "5432"
        database = input("Database Name: ").strip()
        username = input("Username: ").strip()
        password = input("Password: ").strip()
        
        if not all([host, database, username, password]):
            print("❌ All fields are required")
            return None
        
        # Construct connection string
        connection_string = f"postgresql://{username}:{password}@{host}:{port}/{database}"
        
        return {
            'host': host,
            'port': int(port),
            'database': database,
            'username': username,
            'password': password,
            'connection_string': connection_string
        }
    
    def test_connection(self, connection_info):
        """Test database connection."""
        try:
            import psycopg2
            print("\n🔍 Testing database connection...")
            
            conn = psycopg2.connect(
                host=connection_info['host'],
                port=connection_info['port'],
                database=connection_info['database'],
                user=connection_info['username'],
                password=connection_info['password'],
                sslmode='require'
            )
            
            cursor = conn.cursor()
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            
            cursor.close()
            conn.close()
            
            print(f"✅ Connection successful!")
            print(f"PostgreSQL version: {version[0]}")
            return True
            
        except ImportError:
            print("⚠️  psycopg2 not installed. Install it with: pip install psycopg2-binary")
            print("Connection test skipped, but configuration will be saved.")
            return True
        except Exception as e:
            print(f"❌ Connection failed: {e}")
            return False
    
    def update_env_file(self, connection_info):
        """Update .env.cloud file with Render database configuration."""
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
        
        print(f"✅ Updated {env_cloud_file.name} with Render database configuration")
        return True
    
    def display_connection_info(self, connection_info):
        """Display database connection information."""
        print("\n🔗 Database Connection Information:")
        print(f"Host: {connection_info['host']}")
        print(f"Port: {connection_info['port']}")
        print(f"Database: {connection_info['database']}")
        print(f"Username: {connection_info['username']}")
        print(f"Password: {'*' * len(connection_info['password'])}")
        print(f"\nConnection String:")
        print(connection_info['connection_string'])
    
    def create_render_yaml(self):
        """Create render.yaml for easy deployment."""
        render_yaml_content = """# Render Blueprint for RadioFusion Global India
services:
  - type: web
    name: radiofusion-backend
    env: python
    buildCommand: |
      cd backend
      pip install -r requirements.txt
      python manage.py collectstatic --noinput
      python manage.py migrate
    startCommand: |
      cd backend
      gunicorn backend.wsgi:application
    envVars:
      - key: DJANGO_SETTINGS_MODULE
        value: backend.settings
      - key: DEBUG
        value: false
      - key: ALLOWED_HOSTS
        value: .onrender.com
      - key: DATABASE_URL
        fromDatabase:
          name: radiofusion-db
          property: connectionString

databases:
  - name: radiofusion-db
    databaseName: radiofusion_prod
    user: radiofusion_user
"""
        
        render_yaml_file = self.project_root / "render.yaml"
        
        with open(render_yaml_file, 'w') as f:
            f.write(render_yaml_content)
        
        print(f"✅ Created {render_yaml_file.name} for easy Render deployment")
        return True


def main():
    """Main function."""
    setup = RenderDBSetup()
    
    print("🚀 Render PostgreSQL Database Setup")
    print("=" * 50)
    
    # Display manual setup instructions
    setup.display_manual_setup_instructions()
    
    # Ask if user has completed the setup
    completed = input("\nHave you completed the Render PostgreSQL setup? (y/n): ").strip().lower()
    if completed != 'y':
        print("Please complete the setup in Render dashboard first.")
        return
    
    # Get connection details from user
    connection_info = setup.get_connection_details_from_user()
    if not connection_info:
        return
    
    # Display connection information
    setup.display_connection_info(connection_info)
    
    # Test connection
    if not setup.test_connection(connection_info):
        retry = input("\nConnection failed. Do you want to continue anyway? (y/n): ").strip().lower()
        if retry != 'y':
            return
    
    # Update .env.cloud file
    setup.update_env_file(connection_info)
    
    # Create render.yaml for deployment
    create_yaml = input("\nCreate render.yaml for easy deployment? (y/n): ").strip().lower()
    if create_yaml == 'y':
        setup.create_render_yaml()
    
    print("\n✅ Render PostgreSQL setup completed!")
    print("\n🚀 Next steps:")
    print("1. Switch to cloud environment: python scripts/switch_env.py cloud")
    print("2. Run migrations: python manage.py migrate")
    print("3. Create superuser: python manage.py createsuperuser")
    print("4. Test connection: python manage.py db_status")
    print("\n🌐 Deployment:")
    print("- Connect your GitHub repo to Render")
    print("- Use the render.yaml file for automatic deployment")
    print("- Or deploy manually through Render dashboard")
    print("\n💡 Render Tips:")
    print("- Free tier databases have connection limits")
    print("- Monitor usage in Render dashboard")
    print("- Consider upgrading for production workloads")


if __name__ == "__main__":
    main()