@echo off
cd /d "%~dp0"
set AUTH_DEV_VERIFY=1
set NODE_ENV=development
set PORT=3000
echo Open http://localhost:3000/?demo=1 in browser
node server.js
pause
