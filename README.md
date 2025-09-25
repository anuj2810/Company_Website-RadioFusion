# RadioFusion Global India - Company Website

A modern, full-stack web application built with React (Frontend) and Django (Backend) for RadioFusion Global India Pvt Ltd. This project showcases the company's services in Telecom Communication Solutions, Automation, and Education Programs.

## 🌟 Features

### Frontend Features
- **Modern React Application** with Vite for fast development
- **Responsive Design** with Tailwind CSS
- **Dynamic Page Titles** that update based on current page
- **Interactive Components** with smooth animations
- **Image Upload Support** for dynamic content management
- **Contact Form** with real-time validation
- **Service Detail Pages** with comprehensive information
- **Mobile-First Design** optimized for all devices

### Backend Features
- **Django REST Framework** for robust API development
- **Contact Form Processing** with email notifications
- **WhatsApp Integration** via Twilio API
- **CORS Support** for cross-origin requests
- **Environment-based Configuration** for different deployment stages
- **Static File Serving** with WhiteNoise
- **Comprehensive Logging** system

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **Vite 4.4.5** - Next generation frontend tooling
- **React Router DOM 6.12.1** - Declarative routing for React
- **Tailwind CSS 3.4.4** - Utility-first CSS framework
- **Axios 1.4.0** - Promise-based HTTP client
- **Jest & Playwright** - Testing frameworks

### Backend
- **Django 5.2.6** - High-level Python web framework
- **Django REST Framework 3.16.1** - Powerful toolkit for building Web APIs
- **PostgreSQL Support** via psycopg2-binary
- **Twilio 9.8.1** - Communication APIs for SMS/WhatsApp
- **WhiteNoise 6.11.0** - Static file serving
- **django-cors-headers 4.9.0** - CORS handling
- **django-environ 0.12.0** - Environment variable management

## 📁 Project Structure

```
Company_website/
├── backend/                 # Django Backend
│   ├── backend/            # Django project settings
│   │   ├── settings.py     # Main configuration
│   │   ├── urls.py         # URL routing
│   │   └── wsgi.py         # WSGI application
│   ├── core/               # Main Django app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # DRF serializers
│   │   └── utils.py        # Utility functions
│   ├── logs/               # Application logs
│   └── manage.py           # Django management script
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API integration
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── dist/               # Build output
├── .env                    # Environment variables (not in repo)
├── .env.example            # Environment template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Git**
- **PostgreSQL** (for database)

### 1. Clone the Repository
```bash
git clone https://github.com/anuj2810/Company_Website-RadioFusion.git
cd Company_Website-RadioFusion
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Install dependencies
cd backend
pip install -r requirements.txt

# Environment configuration
cd ..
cp .env.example .env
# Edit .env with your configuration

# Database setup
cd backend
python manage.py migrate
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### 3. Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Environment configuration
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## 🔧 Environment Configuration

### Backend (.env)
Copy `.env.example` to `.env` and configure:
```bash
# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Database Configuration
DB_ENGINE=postgresql
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password

# Twilio Configuration (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

### Frontend (.env)
```bash
VITE_API_BASE=http://127.0.0.1:8000
```

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate

# Frontend
cd frontend
npm install
npm run build
```

### Azure Deployment
Detailed Azure deployment guide is available in `AZURE_DEPLOYMENT_GUIDE.md`.

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test          # Jest tests
npm run test:e2e      # Playwright E2E tests
```

### Backend Tests
```bash
cd backend
python manage.py test
```

## 📦 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run Jest tests
- `npm run test:e2e` - Run Playwright tests
- `npm run lint` - Run ESLint

### Backend
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Run database migrations
- `python manage.py collectstatic` - Collect static files
- `python manage.py test` - Run tests
- `python manage.py createsuperuser` - Create admin user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software of RadioFusion Global India Pvt Ltd.

## 📞 Support

For questions or support:
- **Email**: info@radiofusionglobal.com
- **Website**: [RadioFusion Global India](https://radiofusionglobal.com)

---

**Built with ❤️ by RadioFusion Global India Team**

4. **Environment configuration**
   ```bash
   cp ../.env.example ../.env
   # Edit .env with your configuration
   ```

5. **Database setup**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000

## ☁️ Azure Deployment Guide

### Deployment Architecture
- **Frontend**: Azure Static Web Apps
- **Backend**: Azure App Service
- **Database**: Azure Database for PostgreSQL

### Prerequisites for Azure Deployment
- Azure subscription
- Azure CLI installed
- GitHub repository for your code

### Step 1: Prepare for Deployment

#### Create requirements.txt
```bash
cd backend
pip freeze > requirements.txt
```

#### Update Django Settings for Production
Add to `backend/backend/settings.py`:
```python
import dj_database_url

# Production database configuration
if not DEBUG:
    DATABASES['default'] = dj_database_url.parse(
        os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
    
    # Security settings
    SECURE_SSL_REDIRECT = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
```

### Step 2: Deploy Backend to Azure App Service

#### Using Azure CLI
```bash
# Login to Azure
az login

# Create resource group
az group create --name radiofusion-rg --location "East US"

# Create App Service plan
az appservice plan create --name radiofusion-plan --resource-group radiofusion-rg --sku B1 --is-linux

# Create web app
az webapp create --resource-group radiofusion-rg --plan radiofusion-plan --name radiofusion-backend --runtime "PYTHON|3.11"

# Configure deployment from GitHub
az webapp deployment source config --name radiofusion-backend --resource-group radiofusion-rg --repo-url <your-github-repo> --branch main --manual-integration
```

#### Configure Environment Variables
```bash
az webapp config appsettings set --resource-group radiofusion-rg --name radiofusion-backend --settings \
    DEBUG=False \
    SECRET_KEY="your-production-secret-key" \
    ALLOWED_HOSTS="radiofusion-backend.azurewebsites.net" \
    CORS_ALLOWED_ORIGINS="https://your-frontend-domain.azurestaticapps.net" \
    DATABASE_URL="postgresql://user:password@host:port/database"
```

### Step 3: Deploy Frontend to Azure Static Web Apps

#### Using Azure Portal
1. Go to Azure Portal → Create Resource → Static Web Apps
2. Connect to your GitHub repository
3. Set build configuration:
   - **App location**: `/frontend`
   - **Build location**: `/frontend/dist`
   - **Build command**: `npm run build`

#### Configure Environment Variables
In Azure Portal → Static Web Apps → Configuration:
```
VITE_API_BASE=https://radiofusion-backend.azurewebsites.net
```

### Step 4: Database Setup

#### Create Azure Database for PostgreSQL
```bash
# Create PostgreSQL server
az postgres server create --resource-group radiofusion-rg --name radiofusion-db --location "East US" --admin-user dbadmin --admin-password "YourPassword123!" --sku-name GP_Gen5_2

# Create database
az postgres db create --resource-group radiofusion-rg --server-name radiofusion-db --name radiofusion_prod

# Configure firewall (allow Azure services)
az postgres server firewall-rule create --resource-group radiofusion-rg --server radiofusion-db --name AllowAzureServices --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0
```

### Step 5: Final Configuration

#### Update Backend Environment Variables
```bash
az webapp config appsettings set --resource-group radiofusion-rg --name radiofusion-backend --settings \
    DATABASE_URL="postgresql://dbadmin:YourPassword123!@radiofusion-db.postgres.database.azure.com:5432/radiofusion_prod"
```

#### Run Database Migrations
```bash
# SSH into App Service or use Azure Cloud Shell
python manage.py migrate
python manage.py collectstatic --noinput
```

## 🔧 Azure-Specific Configuration

### App Service Configuration (web.config)
Create `backend/web.config`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="PythonHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified"/>
    </handlers>
    <httpPlatform processPath="python" arguments="manage.py runserver --settings=backend.settings" stdoutLogEnabled="true" stdoutLogFile="\\?\%home%\LogFiles\python.log">
      <environmentVariables>
        <environmentVariable name="PYTHONPATH" value="%home%\site\wwwroot"/>
      </environmentVariables>
    </httpPlatform>
  </system.webServer>
</configuration>
```

### Static Web Apps Configuration
Create `frontend/staticwebapp.config.json`:
```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

## 🐛 Troubleshooting Azure Deployment

### Common Issues and Solutions

#### 1. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: 
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check that both services use HTTPS in production

#### 2. Static Files Not Loading
**Problem**: CSS/JS files return 404
**Solution**:
- Run `python manage.py collectstatic` after deployment
- Verify `STATIC_ROOT` and `STATIC_URL` settings

#### 3. Database Connection Issues
**Problem**: Can't connect to PostgreSQL
**Solution**:
- Check firewall rules allow Azure services
- Verify connection string format
- Ensure SSL is enabled: `?sslmode=require`

#### 4. Environment Variables Not Loading
**Problem**: Settings not applied
**Solution**:
- Verify variables are set in Azure Portal
- Restart the App Service after changes
- Check variable names match exactly

#### 5. Build Failures
**Problem**: Deployment fails during build
**Solution**:
- Check `requirements.txt` is up to date
- Verify Python version compatibility
- Review build logs in Azure Portal

### Monitoring and Logs
- **App Service Logs**: Azure Portal → App Service → Monitoring → Log stream
- **Static Web Apps**: Azure Portal → Static Web Apps → Functions → Monitor
- **Database**: Azure Portal → PostgreSQL → Monitoring → Metrics

## 📞 Support

For deployment issues or questions:
- **Email**: info@radiofusionglobal.com
- **Documentation**: Check Azure documentation for specific service issues
- **Logs**: Always check Azure Portal logs for detailed error messages

## 📄 License

This project is proprietary software of RadioFusion Global India Pvt Ltd.

---

**Built with ❤️ by RadioFusion Global India Team**