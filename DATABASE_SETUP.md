# RadioFusion Global India - Database Configuration Guide

This guide explains how to configure and manage databases for the RadioFusion Global India project, supporting both local development and cloud production environments.

## 🏗️ Architecture Overview

The project supports multiple database configurations:
- **Development**: Local PostgreSQL for development
- **Production**: Cloud PostgreSQL for production deployment
- **Cloud**: Azure/Railway/Render PostgreSQL for cloud hosting

## 📋 Prerequisites

### Local Development
- PostgreSQL 12+ installed locally
- Python 3.8+
- Django 4.0+

### Cloud Deployment
- Azure account (for Azure Database)
- Railway account (for Railway PostgreSQL)
- Render account (for Render PostgreSQL)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up Local PostgreSQL
```bash
# Install PostgreSQL (Windows)
# Download from: https://www.postgresql.org/download/windows/

# Create database and user
psql -U postgres
CREATE DATABASE radiofusion_db;
CREATE USER radiofusion_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE radiofusion_db TO radiofusion_user;
\q
```

### 3. Configure Environment
```bash
# Copy and edit environment file
cp .env.example .env

# Set database configuration in .env
DB_ENGINE=postgresql
DB_NAME=radiofusion_db
DB_USER=radiofusion_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 4. Run Migrations
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 5. Start Development Server
```bash
python manage.py runserver
```

## 🔧 Environment Management

### Available Environments

1. **Development** (`.env.development`)
   - Local PostgreSQL database
   - Debug mode enabled
   - Local CORS settings

2. **Production** (`.env.production`)
   - Cloud PostgreSQL database
   - Debug mode disabled
   - Production CORS settings

3. **Cloud** (`.env.cloud`)
   - Azure/Railway/Render PostgreSQL
   - Cloud-specific configurations

### Switching Environments

#### Method 1: Using Django Management Command
```bash
# Switch to development
python manage.py switch_db development

# Switch to production
python manage.py switch_db production

# Switch to cloud
python manage.py switch_db cloud
```

#### Method 2: Using Standalone Script
```bash
# Switch to development
python scripts/switch_env.py development

# Switch to production
python scripts/switch_env.py production

# Switch to cloud
python scripts/switch_env.py cloud
```

### Check Current Configuration
```bash
python manage.py db_status
```

## ☁️ Cloud Database Setup

### Option 1: Azure Database for PostgreSQL

1. **Automated Setup**
   ```bash
   python scripts/setup_azure_db.py
   ```

2. **Manual Setup**
   - Go to Azure Portal
   - Create "Azure Database for PostgreSQL"
   - Configure firewall rules
   - Update `.env.cloud` with connection details

### Option 2: Railway PostgreSQL

1. **Automated Setup**
   ```bash
   python scripts/setup_railway_db.py
   ```

2. **Manual Setup**
   - Go to Railway Dashboard
   - Create new project
   - Add PostgreSQL service
   - Copy DATABASE_URL to `.env.cloud`

### Option 3: Render PostgreSQL

1. **Automated Setup**
   ```bash
   python scripts/setup_render_db.py
   ```

2. **Manual Setup**
   - Go to Render Dashboard
   - Create PostgreSQL database
   - Copy connection details to `.env.cloud`

## 🔄 Data Migration

### Migrate Data Between Environments

```bash
# Migrate from development to production
python manage.py migrate_data --from development --to production

# Migrate specific apps only
python manage.py migrate_data --from development --to production --apps core,users

# Dry run (preview changes)
python manage.py migrate_data --from development --to production --dry-run
```

### Sync Databases

```bash
# Sync development to cloud
python scripts/sync_databases.py --from development --to cloud

# Sync with specific apps
python scripts/sync_databases.py --from development --to cloud --apps core,users

# Exclude specific models
python scripts/sync_databases.py --from development --to cloud --exclude auth.User
```

## 📁 File Structure

```
Company_website/
├── backend/
│   ├── core/
│   │   └── management/
│   │       └── commands/
│   │           ├── switch_db.py      # Environment switching
│   │           ├── migrate_data.py   # Data migration
│   │           └── db_status.py      # Database status
│   └── backend/
│       └── settings.py               # Django settings
├── scripts/
│   ├── switch_env.py                 # Standalone env switcher
│   ├── sync_databases.py             # Database synchronization
│   ├── setup_azure_db.py             # Azure setup
│   ├── setup_railway_db.py           # Railway setup
│   └── setup_render_db.py            # Render setup
├── .env                              # Current environment
├── .env.development                  # Development config
├── .env.production                   # Production config
├── .env.cloud                        # Cloud config
└── .env.backup                       # Backup of previous config
```

## 🔐 Environment Variables

### Database Configuration
```bash
# Database engine (postgresql or sqlite)
DB_ENGINE=postgresql

# Database connection details
DB_NAME=radiofusion_db
DB_USER=radiofusion_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Alternative: Full database URL
DATABASE_URL=postgresql://user:password@host:port/database
```

### Django Configuration
```bash
# Django settings
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## 🛠️ Troubleshooting

### Common Issues

1. **Connection Refused**
   ```bash
   # Check if PostgreSQL is running
   pg_ctl status
   
   # Start PostgreSQL service
   pg_ctl start
   ```

2. **Authentication Failed**
   ```bash
   # Reset PostgreSQL password
   psql -U postgres
   ALTER USER postgres PASSWORD 'new_password';
   ```

3. **Database Does Not Exist**
   ```bash
   # Create database
   createdb -U postgres radiofusion_db
   ```

4. **Migration Issues**
   ```bash
   # Reset migrations
   python manage.py migrate --fake-initial
   
   # Or reset completely
   python manage.py migrate --fake core zero
   python manage.py migrate
   ```

### Environment Issues

1. **Wrong Environment Active**
   ```bash
   # Check current environment
   python manage.py db_status
   
   # Switch to correct environment
   python manage.py switch_db development
   ```

2. **Missing Environment File**
   ```bash
   # Copy from template
   cp .env.development .env
   ```

## 📊 Monitoring and Maintenance

### Database Status Check
```bash
# Comprehensive status check
python manage.py db_status --detailed

# Quick connection test
python manage.py db_status
```

### Backup and Restore
```bash
# Backup current database
pg_dump -U postgres radiofusion_db > backup.sql

# Restore from backup
psql -U postgres radiofusion_db < backup.sql
```

## 🚀 Deployment

### Local to Cloud Migration

1. **Set up cloud database**
   ```bash
   python scripts/setup_azure_db.py  # or Railway/Render
   ```

2. **Switch to cloud environment**
   ```bash
   python scripts/switch_env.py cloud
   ```

3. **Migrate data**
   ```bash
   python scripts/sync_databases.py --from development --to cloud
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

### Production Deployment

1. **Switch to production environment**
   ```bash
   python scripts/switch_env.py production
   ```

2. **Install production dependencies**
   ```bash
   pip install -r requirements.txt
   pip install gunicorn
   ```

3. **Collect static files**
   ```bash
   python manage.py collectstatic --noinput
   ```

4. **Run with Gunicorn**
   ```bash
   gunicorn backend.wsgi:application
   ```

## 📚 Additional Resources

- [Django Database Documentation](https://docs.djangoproject.com/en/4.0/ref/databases/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/en-us/azure/postgresql/)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your environment configuration
3. Check database connection status
4. Review Django logs for detailed error messages

For additional help, contact the development team or create an issue in the project repository.