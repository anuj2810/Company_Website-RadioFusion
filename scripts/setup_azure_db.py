#!/usr/bin/env python3
"""
Azure Database for PostgreSQL Setup Script
This script helps configure Azure Database for PostgreSQL for RadioFusion Global India.
"""

import os
import sys
import json
import subprocess
from pathlib import Path


class AzureDBSetup:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        
    def check_azure_cli(self):
        """Check if Azure CLI is installed."""
        try:
            result = subprocess.run(['az', '--version'], capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Azure CLI is installed")
                return True
            else:
                print("❌ Azure CLI is not installed")
                return False
        except FileNotFoundError:
            print("❌ Azure CLI is not installed")
            return False
    
    def login_azure(self):
        """Login to Azure."""
        print("🔐 Logging into Azure...")
        result = subprocess.run(['az', 'login'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Successfully logged into Azure")
            return True
        else:
            print(f"❌ Failed to login to Azure: {result.stderr}")
            return False
    
    def list_subscriptions(self):
        """List available Azure subscriptions."""
        result = subprocess.run(['az', 'account', 'list'], capture_output=True, text=True)
        if result.returncode == 0:
            subscriptions = json.loads(result.stdout)
            print("\n📋 Available subscriptions:")
            for i, sub in enumerate(subscriptions):
                status = "✅" if sub.get('isDefault') else "  "
                print(f"{status} {i+1}. {sub['name']} ({sub['id']})")
            return subscriptions
        else:
            print(f"❌ Failed to list subscriptions: {result.stderr}")
            return []
    
    def set_subscription(self, subscription_id):
        """Set active Azure subscription."""
        result = subprocess.run(['az', 'account', 'set', '--subscription', subscription_id], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Set active subscription to {subscription_id}")
            return True
        else:
            print(f"❌ Failed to set subscription: {result.stderr}")
            return False
    
    def create_resource_group(self, resource_group, location):
        """Create Azure resource group."""
        print(f"📦 Creating resource group '{resource_group}' in {location}...")
        result = subprocess.run([
            'az', 'group', 'create',
            '--name', resource_group,
            '--location', location
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✅ Resource group '{resource_group}' created successfully")
            return True
        else:
            print(f"❌ Failed to create resource group: {result.stderr}")
            return False
    
    def create_postgresql_server(self, server_name, resource_group, admin_user, admin_password, location):
        """Create Azure Database for PostgreSQL server."""
        print(f"🗄️  Creating PostgreSQL server '{server_name}'...")
        
        result = subprocess.run([
            'az', 'postgres', 'server', 'create',
            '--name', server_name,
            '--resource-group', resource_group,
            '--location', location,
            '--admin-user', admin_user,
            '--admin-password', admin_password,
            '--sku-name', 'B_Gen5_1',  # Basic tier, 1 vCore
            '--storage-size', '5120',   # 5GB storage
            '--version', '11'
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✅ PostgreSQL server '{server_name}' created successfully")
            return True
        else:
            print(f"❌ Failed to create PostgreSQL server: {result.stderr}")
            return False
    
    def configure_firewall(self, server_name, resource_group):
        """Configure firewall rules for PostgreSQL server."""
        print("🔥 Configuring firewall rules...")
        
        # Allow Azure services
        result1 = subprocess.run([
            'az', 'postgres', 'server', 'firewall-rule', 'create',
            '--name', 'AllowAzureServices',
            '--server', server_name,
            '--resource-group', resource_group,
            '--start-ip-address', '0.0.0.0',
            '--end-ip-address', '0.0.0.0'
        ], capture_output=True, text=True)
        
        # Allow all IPs (for development - should be restricted in production)
        result2 = subprocess.run([
            'az', 'postgres', 'server', 'firewall-rule', 'create',
            '--name', 'AllowAll',
            '--server', server_name,
            '--resource-group', resource_group,
            '--start-ip-address', '0.0.0.0',
            '--end-ip-address', '255.255.255.255'
        ], capture_output=True, text=True)
        
        if result1.returncode == 0 and result2.returncode == 0:
            print("✅ Firewall rules configured successfully")
            print("⚠️  WARNING: All IPs are allowed. Restrict this in production!")
            return True
        else:
            print("❌ Failed to configure firewall rules")
            return False
    
    def create_database(self, server_name, resource_group, database_name):
        """Create database on PostgreSQL server."""
        print(f"🗃️  Creating database '{database_name}'...")
        
        result = subprocess.run([
            'az', 'postgres', 'db', 'create',
            '--name', database_name,
            '--server-name', server_name,
            '--resource-group', resource_group
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✅ Database '{database_name}' created successfully")
            return True
        else:
            print(f"❌ Failed to create database: {result.stderr}")
            return False
    
    def generate_connection_string(self, server_name, database_name, admin_user, admin_password):
        """Generate connection string for the database."""
        host = f"{server_name}.postgres.database.azure.com"
        connection_string = f"postgresql://{admin_user}%40{server_name}:{admin_password}@{host}:5432/{database_name}?sslmode=require"
        
        print("\n🔗 Database Connection Information:")
        print(f"Host: {host}")
        print(f"Database: {database_name}")
        print(f"Username: {admin_user}@{server_name}")
        print(f"Port: 5432")
        print(f"SSL Mode: require")
        print(f"\nConnection String:")
        print(connection_string)
        
        return {
            'host': host,
            'database': database_name,
            'username': f"{admin_user}@{server_name}",
            'password': admin_password,
            'port': 5432,
            'connection_string': connection_string
        }
    
    def update_env_file(self, connection_info):
        """Update .env.cloud file with Azure database configuration."""
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
            elif line.startswith('# DATABASE_URL='):
                updated_lines.append(f"DATABASE_URL={connection_info['connection_string']}")
            else:
                updated_lines.append(line)
        
        # Write updated content
        with open(env_cloud_file, 'w') as f:
            f.write('\n'.join(updated_lines))
        
        print(f"✅ Updated {env_cloud_file.name} with Azure database configuration")
        return True


def main():
    """Main function."""
    setup = AzureDBSetup()
    
    print("🚀 Azure Database for PostgreSQL Setup")
    print("=" * 50)
    
    # Check prerequisites
    if not setup.check_azure_cli():
        print("\n📥 Please install Azure CLI first:")
        print("https://docs.microsoft.com/en-us/cli/azure/install-azure-cli")
        return
    
    # Login to Azure
    if not setup.login_azure():
        return
    
    # List and select subscription
    subscriptions = setup.list_subscriptions()
    if not subscriptions:
        return
    
    if len(subscriptions) > 1:
        try:
            choice = int(input("\nSelect subscription (number): ")) - 1
            if 0 <= choice < len(subscriptions):
                setup.set_subscription(subscriptions[choice]['id'])
            else:
                print("❌ Invalid selection")
                return
        except ValueError:
            print("❌ Invalid input")
            return
    
    # Get configuration from user
    print("\n⚙️  Database Configuration:")
    server_name = input("PostgreSQL server name (e.g., radiofusion-db): ").strip()
    resource_group = input("Resource group name (e.g., radiofusion-rg): ").strip()
    location = input("Location (e.g., eastus, westeurope): ").strip() or "eastus"
    database_name = input("Database name (e.g., radiofusion_prod): ").strip() or "radiofusion_prod"
    admin_user = input("Admin username: ").strip()
    admin_password = input("Admin password: ").strip()
    
    if not all([server_name, resource_group, admin_user, admin_password]):
        print("❌ All fields are required")
        return
    
    print(f"\n🔧 Creating Azure resources...")
    
    # Create resource group
    if not setup.create_resource_group(resource_group, location):
        return
    
    # Create PostgreSQL server
    if not setup.create_postgresql_server(server_name, resource_group, admin_user, admin_password, location):
        return
    
    # Configure firewall
    if not setup.configure_firewall(server_name, resource_group):
        return
    
    # Create database
    if not setup.create_database(server_name, resource_group, database_name):
        return
    
    # Generate connection information
    connection_info = setup.generate_connection_string(server_name, database_name, admin_user, admin_password)
    
    # Update .env.cloud file
    setup.update_env_file(connection_info)
    
    print("\n✅ Azure Database for PostgreSQL setup completed!")
    print("\n🚀 Next steps:")
    print("1. Switch to cloud environment: python scripts/switch_env.py cloud")
    print("2. Run migrations: python manage.py migrate")
    print("3. Create superuser: python manage.py createsuperuser")
    print("4. Test connection: python manage.py db_status")


if __name__ == "__main__":
    main()