# Azure Deployment Guide for RadioFusion Application

This guide provides step-by-step instructions to deploy the RadioFusion full-stack application (Django backend + React frontend) to Microsoft Azure.

## Prerequisites

1. **Azure CLI** installed and configured
2. **Azure subscription** with appropriate permissions
3. **Git** installed
4. **Node.js** (v18 or higher) and **npm**
5. **Python** (3.9 or higher) and **pip**

## Architecture Overview

The deployment will create:
- **Azure App Service** for the Django backend
- **Azure Static Web Apps** for the React frontend
- **Azure Database for PostgreSQL** for the database
- **Azure Storage Account** for static files and media

## Step 1: Prepare Your Application

### 1.1 Backend Preparation

1. Ensure your Django settings are production-ready:
```bash
cd E:\Company_website\backend
```

2. Create a production requirements file if not exists:
```bash
pip freeze > requirements.txt
```

3. Verify your `settings.py` has proper environment variable handling for:
   - `SECRET_KEY`
   - `DEBUG=False` for production
   - `ALLOWED_HOSTS`
   - Database configuration

### 1.2 Frontend Preparation

1. Build the React application:
```bash
cd E:\Company_website\frontend
npm run build
```

2. Verify the build creates a `dist` folder with production assets.

## Step 2: Azure Resource Setup

### 2.1 Login to Azure

```bash
az login
```

### 2.2 Create Resource Group

```bash
az group create --name radiofusion-rg --location "East US"
```

### 2.3 Create PostgreSQL Database

```bash
# Create PostgreSQL server
az postgres server create \
  --resource-group radiofusion-rg \
  --name radiofusion-db-server \
  --location "East US" \
  --admin-user radiofusionadmin \
  --admin-password "YourSecurePassword123!" \
  --sku-name GP_Gen5_2 \
  --version 11

# Create database
az postgres db create \
  --resource-group radiofusion-rg \
  --server-name radiofusion-db-server \
  --name radiofusion_db

# Configure firewall to allow Azure services
az postgres server firewall-rule create \
  --resource-group radiofusion-rg \
  --server radiofusion-db-server \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

### 2.4 Create Storage Account

```bash
az storage account create \
  --name radiofusionstorage \
  --resource-group radiofusion-rg \
  --location "East US" \
  --sku Standard_LRS
```

## Step 3: Deploy Backend (Django API)

### 3.1 Create App Service Plan

```bash
az appservice plan create \
  --name radiofusion-plan \
  --resource-group radiofusion-rg \
  --sku B1 \
  --is-linux
```

### 3.2 Create Web App

```bash
az webapp create \
  --resource-group radiofusion-rg \
  --plan radiofusion-plan \
  --name radiofusion-backend \
  --runtime "PYTHON|3.9" \
  --deployment-local-git
```

### 3.3 Configure Environment Variables

```bash
# Database configuration
az webapp config appsettings set \
  --resource-group radiofusion-rg \
  --name radiofusion-backend \
  --settings \
    DATABASE_URL="postgresql://radiofusionadmin:YourSecurePassword123!@radiofusion-db-server.postgres.database.azure.com:5432/radiofusion_db" \
    SECRET_KEY="your-production-secret-key-here" \
    DEBUG="False" \
    ALLOWED_HOSTS="radiofusion-backend.azurewebsites.net,localhost,127.0.0.1"

# Get storage account key
STORAGE_KEY=$(az storage account keys list --resource-group radiofusion-rg --account-name radiofusionstorage --query '[0].value' -o tsv)

# Configure storage settings
az webapp config appsettings set \
  --resource-group radiofusion-rg \
  --name radiofusion-backend \
  --settings \
    AZURE_STORAGE_ACCOUNT_NAME="radiofusionstorage" \
    AZURE_STORAGE_ACCOUNT_KEY="$STORAGE_KEY"
```

### 3.4 Configure Startup Command

```bash
az webapp config set \
  --resource-group radiofusion-rg \
  --name radiofusion-backend \
  --startup-file "gunicorn --bind=0.0.0.0 --timeout 600 core.wsgi"
```

### 3.5 Deploy Backend Code

```bash
cd E:\Company_website\backend

# Add Azure remote
az webapp deployment source config-local-git \
  --name radiofusion-backend \
  --resource-group radiofusion-rg

# Get deployment URL
DEPLOY_URL=$(az webapp deployment list-publishing-credentials --name radiofusion-backend --resource-group radiofusion-rg --query scmUri -o tsv)

# Add git remote and deploy
git remote add azure $DEPLOY_URL
git add .
git commit -m "Deploy to Azure"
git push azure main
```

### 3.6 Run Database Migrations

```bash
az webapp ssh --resource-group radiofusion-rg --name radiofusion-backend
# Inside the SSH session:
python manage.py migrate
python manage.py collectstatic --noinput
exit
```

## Step 4: Deploy Frontend (React App)

### 4.1 Create Static Web App

```bash
az staticwebapp create \
  --name radiofusion-frontend \
  --resource-group radiofusion-rg \
  --source https://github.com/yourusername/radiofusion \
  --location "East US2" \
  --branch main \
  --app-location "/frontend" \
  --output-location "dist"
```

### 4.2 Configure API Integration

1. Get the backend URL:
```bash
az webapp show --resource-group radiofusion-rg --name radiofusion-backend --query defaultHostName -o tsv
```

2. Update your React app's API configuration to point to the backend URL.

3. Configure CORS in Django settings to allow the frontend domain.

## Step 5: Configure Custom Domain (Optional)

### 5.1 Backend Custom Domain

```bash
az webapp config hostname add \
  --webapp-name radiofusion-backend \
  --resource-group radiofusion-rg \
  --hostname api.yourdomain.com
```

### 5.2 Frontend Custom Domain

```bash
az staticwebapp hostname set \
  --name radiofusion-frontend \
  --resource-group radiofusion-rg \
  --hostname www.yourdomain.com
```

## Step 6: Configure SSL Certificates

Azure automatically provides SSL certificates for *.azurewebsites.net and *.azurestaticapps.net domains. For custom domains:

```bash
# Enable HTTPS redirect
az webapp update \
  --resource-group radiofusion-rg \
  --name radiofusion-backend \
  --https-only true
```

## Step 7: Monitoring and Logging

### 7.1 Enable Application Insights

```bash
az monitor app-insights component create \
  --app radiofusion-insights \
  --location "East US" \
  --resource-group radiofusion-rg

# Get instrumentation key
INSIGHTS_KEY=$(az monitor app-insights component show --app radiofusion-insights --resource-group radiofusion-rg --query instrumentationKey -o tsv)

# Configure backend monitoring
az webapp config appsettings set \
  --resource-group radiofusion-rg \
  --name radiofusion-backend \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY="$INSIGHTS_KEY"
```

### 7.2 Enable Logging

```bash
az webapp log config \
  --resource-group radiofusion-rg \
  --name radiofusion-backend \
  --application-logging true \
  --level information
```

## Step 8: Scaling and Performance

### 8.1 Configure Auto-scaling

```bash
az monitor autoscale create \
  --resource-group radiofusion-rg \
  --resource radiofusion-backend \
  --resource-type Microsoft.Web/sites \
  --name radiofusion-autoscale \
  --min-count 1 \
  --max-count 3 \
  --count 1
```

## Step 9: Backup and Disaster Recovery

### 9.1 Database Backup

```bash
az postgres server configuration set \
  --resource-group radiofusion-rg \
  --server-name radiofusion-db-server \
  --name backup_retention_days \
  --value 7
```

### 9.2 App Service Backup

```bash
az webapp config backup create \
  --resource-group radiofusion-rg \
  --webapp-name radiofusion-backend \
  --backup-name initial-backup \
  --storage-account-url "https://radiofusionstorage.blob.core.windows.net/backups"
```

## Troubleshooting

### Common Issues:

1. **Database Connection Issues**:
   - Verify firewall rules allow Azure services
   - Check connection string format
   - Ensure SSL is properly configured

2. **Static Files Not Loading**:
   - Run `python manage.py collectstatic`
   - Verify Azure Storage configuration
   - Check CORS settings

3. **Frontend API Calls Failing**:
   - Verify CORS configuration in Django
   - Check API endpoint URLs
   - Ensure HTTPS is used for production

### Useful Commands:

```bash
# View backend logs
az webapp log tail --resource-group radiofusion-rg --name radiofusion-backend

# Restart backend app
az webapp restart --resource-group radiofusion-rg --name radiofusion-backend

# Check app status
az webapp show --resource-group radiofusion-rg --name radiofusion-backend --query state
```

## Cost Optimization

1. Use **Basic** tier for development/testing
2. Enable **auto-scaling** to handle traffic spikes
3. Use **Azure Reserved Instances** for production
4. Monitor usage with **Azure Cost Management**

## Security Best Practices

1. Use **Azure Key Vault** for secrets
2. Enable **Azure Security Center**
3. Configure **Network Security Groups**
4. Regular security updates and patches
5. Use **Managed Identity** where possible

## Final URLs

After successful deployment:
- **Backend API**: `https://radiofusion-backend.azurewebsites.net`
- **Frontend App**: `https://radiofusion-frontend.azurestaticapps.net`
- **Database**: `radiofusion-db-server.postgres.database.azure.com`

## Support

For issues or questions:
1. Check Azure documentation
2. Review application logs
3. Use Azure Support if needed
4. Monitor with Application Insights

---

**Note**: Replace placeholder values (passwords, domain names, etc.) with your actual values before deployment.