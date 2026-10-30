@echo off
setlocal
cd /d "%~dp0"
title TREVNIXO - Start Website
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Install Node.js LTS from https://nodejs.org/ and then run this file again.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js LTS and ensure npm is included.
  pause
  exit /b 1
)
if not exist node_modules (
  echo First run: installing website dependencies. This may take a few minutes...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Check internet connection and try again.
    pause
    exit /b 1
  )
)
echo.
echo Starting TREVNIXO. Keep this window open while using the website.
echo Open http://localhost:3000 in your browser.
call npm run dev
pause
