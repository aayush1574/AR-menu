@echo off
echo Starting AR Viewer server...
echo.

:: Start the file server in background
start /B npx serve . -p 3000 --no-clipboard > nul 2>&1

:: Wait for server to start
timeout /t 3 /nobreak > nul

:: Start localtunnel and capture URL
echo Getting public URL...
echo.
npx localtunnel --port 3000
