# Download code from Github
git clone https://github.com/akrck02/ServerDashboard.git && echo "Downloaded code from Github"

# install dependencies
cd ServerDashboard && npm i && echo "Installed dependencies"

# Compile source files
npm run compile-client && echo "Compiled source files"

# pack styles and scripts
npm run pack && echo "Packed styles and scripts"

# build go app
cd backend && go build -o server-dashboard-api && echo "Built go app"

# change to production mode
cd ../ && npm run prod && echo "Changed to production mode"

# remove source files
rm -rf app/indexDev.html app/styles/src frontend/src frontend/temp frontend/tsconfig.json styles.config env.js Readme.md bin .github && echo "Removed source files"

# add execution permissions
chmod +x backend/server-dashboard-api && echo "Added execution permissions"

# run go app
ls -la && npm run serve & ./backend/server-dashboard-api && echo "App is running!"
