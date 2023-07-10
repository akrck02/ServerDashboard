# add execution permissions
chmod +x /app/ServerDashboard/backend/server-dashboard-api

# run go app
cd /app/ServerDashboard/backend && ./server-dashboard-api & npm run serve
