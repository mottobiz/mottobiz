@echo off
echo 🚀 MottoBiz Deploy
echo =================
powershell -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" -Message "Update site"
pause
