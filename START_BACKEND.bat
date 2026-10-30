@echo off
title TREVNIXO API Backend
cd /d "%~dp0"
if not exist .env (
 copy .env.example .env >nul
 echo Created .env. Replace ADMIN_TOKEN with a long random secret.
 notepad .env
)
if not exist node_modules (
 echo Installing dependencies...
 call npm install
 if errorlevel 1 (echo Install failed. Take a screenshot and ask for help.&pause&exit /b 1)
)
echo Starting API at http://localhost:4000
call npm run api
pause
