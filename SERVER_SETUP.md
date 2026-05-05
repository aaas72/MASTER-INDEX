# MASTER INDEX - SERVER SETUP GUIDE

This guide provides instructions for setting up and maintaining the MASTER INDEX application on an Ubuntu 24.04 server.

## 1. SERVER PREPARATION
Ensure the following are installed:
- Node.js (v20 LTS)
- NPM
- Nginx
- PM2 (Global install: sudo npm install -g pm2)

## 2. DEPLOYMENT STEPS
Run these commands on the server:

```bash
# Prepare directory
sudo mkdir -p /var/www/master-index
sudo chown -R $USER:$USER /var/www/master-index
cd /var/www/master-index

# Clone repository
git clone https://github.com/aaas72/MASTER-INDEX.git .

# Install and Build
npm install
npm run build
```

## 3. PROCESS MANAGEMENT (PM2)
Manage the application process:

```bash
# Start the app
pm2 start npm --name "master-index" -- start

# Save for auto-start on reboot
pm2 save
pm2 startup
```

## 4. MAINTENANCE & UPDATES
To update the application:

```bash
# Navigate to directory
cd /var/www/master-index

# Pull latest code
git pull origin main

# Re-install and rebuild
npm install
npm run build

# Restart the process
pm2 restart master-index
```

## 5. NGINX REVERSE PROXY
Create config at: `/etc/nginx/sites-available/master-index`

```nginx
server {
    listen 80;
    server_name 138.68.91.83;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and Restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/master-index /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```
