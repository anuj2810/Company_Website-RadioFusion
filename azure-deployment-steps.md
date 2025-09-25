# Azure Deployment Guide - RadioFusion Global India

This guide will walk you through deploying your RadioFusion project to Azure using GitHub integration.

## Prerequisites

1. **Azure Account**: Sign up at [portal.azure.com](https://portal.azure.com)
2. **GitHub Repository**: Your code is already pushed to GitHub ✅
3. **Azure CLI** (optional): For command-line operations

## Step 1: Set up Azure Database for PostgreSQL

### 1.1 Create PostgreSQL Database
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → Search "Azure Database for PostgreSQL"
3. Select "Azure Database for PostgreSQL flexible server"
4. Fill in the details:
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create new (e.g., `radiofusion-rg`)
   - **Server Name**: `radiofusion-db-server` (must be globally unique)
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: 14 or 15
   - **Workload Type**: Development
   - **Compute + Storage**: Basic (1 vCore, 32GB storage)
   - **Admin Username**: `radiofusion_admin`
   - **Password**: Create a strong password

### 1.2 Configure Database Security
1. After creation, go to your PostgreSQL server
2. Navigate to "Connection security"
3. Set "Allow access to Azure services" to **Yes**
4. Add your IP address to firewall rules
5. Click "Save"

### 1.3 Create Database
1. In your PostgreSQL server, go to "Databases"
2. Click "Add" and create database named `radiofusion_db`

## Step 2: Deploy Django Backend to Azure App Service

### 2.1 Create App Service
1. Go to Azure Portal → "Create a resource"
2. Search "Web App" and select it
3. Configure:
   - **Subscription**: Your subscription
   - **Resource Group**: Use existing `radiofusion-rg`
   - **Name**: `radiofusion-backend` (must be globally unique)
   - **Publish**: Code
   - **Runtime Stack**: Python 3.11
   - **Operating System**: Linux
   - **Region**: Same as your database
   - **Pricing Plan**: Basic B1 (or Free F1 for testing)

### 2.2 Configure App Service Settings
1. After creation, go to your App Service
2. Navigate to "Configuration" → "Application settings"
3. Add these environment variables:

```
SECRET_KEY=your-django-secret-key-here
DEBUG=False
ALLOWED_HOSTS=radiofusion-backend.azurewebsites.net
CORS_ALLOWED_ORIGINS=https://your-static-web-app-url.azurestaticapps.net
DATABASE_URL=postgresql://radiofusion_admin:your-password@radiofusion-db-server.postgres.database.azure.com:5432/radiofusion_db?sslmode=require
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number
```

### 2.3 Set up Deployment from GitHub
1. In your App Service, go to "Deployment Center"
2. Select "GitHub" as source
3. Authorize GitHub access
4. Select:
   - **Organization**: Your GitHub username
   - **Repository**: Company_Website-RadioFusion
   - **Branch**: main
5. Build provider: "GitHub Actions"
6. Runtime stack: Python
7. Version: 3.11
8. Click "Save"

## Step 3: Deploy Frontend to Azure Static Web Apps

### 3.1 Create Static Web App
1. Go to Azure Portal → "Create a resource"
2. Search "Static Web Apps" and select it
3. Configure:
   - **Subscription**: Your subscription
   - **Resource Group**: Use existing `radiofusion-rg`
   - **Name**: `radiofusion-frontend`
   - **Plan Type**: Free
   - **Region**: Choose closest region
   - **Source**: GitHub
   - **GitHub Account**: Your account
   - **Organization**: Your username
   - **Repository**: Company_Website-RadioFusion
   - **Branch**: main
   - **Build Presets**: React
   - **App Location**: `/frontend`
   - **Output Location**: `dist`

### 3.2 Configure Static Web App
1. After creation, go to your Static Web App
2. Navigate to "Configuration"
3. Add environment variable:
   - **Name**: `VITE_API_BASE`
   - **Value**: `https://radiofusion-backend.azurewebsites.net`

## Step 4: Configure GitHub Secrets

### 4.1 Get Azure Credentials
1. **Static Web Apps API Token**:
   - Go to your Static Web App → "Manage deployment token"
   - Copy the token

2. **App Service Publish Profile**:
   - Go to your App Service → "Get publish profile"
   - Download the file and copy its contents

### 4.2 Add GitHub Secrets
1. Go to your GitHub repository
2. Navigate to "Settings" → "Secrets and variables" → "Actions"
3. Add these secrets:

```
AZURE_STATIC_WEB_APPS_API_TOKEN=<your-static-web-app-token>
AZURE_WEBAPP_NAME=radiofusion-backend
AZURE_WEBAPP_PUBLISH_PROFILE=<your-publish-profile-content>
DJANGO_SECRET_KEY=<your-django-secret-key>
DATABASE_URL=<your-postgresql-connection-string>
VITE_API_BASE=https://radiofusion-backend.azurewebsites.net
```

## Step 5: Update CORS Settings

### 5.1 Update Django Settings
The CORS settings should already be configured in your Django settings, but verify:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-static-web-app-url.azurestaticapps.net",
    "http://localhost:3000",  # For local development
]
```

## Step 6: Deploy and Test

### 6.1 Trigger Deployment
1. Make a small change to your code (e.g., update README)
2. Commit and push to main branch:
```bash
git add .
git commit -m "Configure Azure deployment"
git push origin main
```

### 6.2 Monitor Deployment
1. Go to GitHub → Your repository → "Actions"
2. Watch the deployment workflows run
3. Check both frontend and backend deployments

### 6.3 Test Your Application
1. **Frontend URL**: Check your Static Web App URL in Azure Portal
2. **Backend URL**: Check your App Service URL in Azure Portal
3. Test all functionality:
   - Contact forms
   - Database connections
   - Email sending
   - API endpoints

## Step 7: Custom Domain (Optional)

### 7.1 Configure Custom Domain for Frontend
1. In Static Web Apps → "Custom domains"
2. Add your domain and follow DNS configuration steps

### 7.2 Configure Custom Domain for Backend
1. In App Service → "Custom domains"
2. Add your API subdomain and configure DNS

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Check firewall rules in PostgreSQL server
   - Verify connection string format
   - Ensure SSL mode is set to 'require'

2. **CORS Errors**:
   - Update CORS_ALLOWED_ORIGINS in Django settings
   - Redeploy backend after changes

3. **Static Files Not Loading**:
   - Run `python manage.py collectstatic` in deployment
   - Check Azure Storage configuration

4. **Environment Variables**:
   - Verify all secrets are set in GitHub
   - Check App Service configuration

## Monitoring and Logs

### View Logs:
1. **App Service Logs**: App Service → "Log stream"
2. **Static Web Apps**: Static Web Apps → "Functions" → Monitor
3. **GitHub Actions**: Repository → "Actions" tab

## Cost Optimization

- Use **Free tiers** for development/testing
- Monitor usage in Azure Cost Management
- Set up billing alerts
- Scale down resources when not needed

## Security Best Practices

1. **Never commit secrets** to GitHub
2. **Use managed identities** where possible
3. **Enable HTTPS only** for all services
4. **Regular security updates** for dependencies
5. **Monitor access logs** regularly

---

## Quick Reference URLs

After deployment, your URLs will be:
- **Frontend**: `https://radiofusion-frontend.azurestaticapps.net`
- **Backend**: `https://radiofusion-backend.azurewebsites.net`
- **Database**: `radiofusion-db-server.postgres.database.azure.com`

## Support

If you encounter issues:
1. Check Azure Portal logs
2. Review GitHub Actions logs
3. Verify all environment variables
4. Test database connectivity

Happy deploying! 🚀