@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "DOCKER_DESKTOP=C:\Program Files\Docker\Docker\Docker Desktop.exe"

docker info >nul 2>&1
if errorlevel 1 (
  if exist "%DOCKER_DESKTOP%" (
    start "Docker Desktop" "%DOCKER_DESKTOP%"
    echo Waiting for Docker Desktop to start...
    call :wait_for_docker
  ) else (
    echo Docker Desktop is not running and was not found at:
    echo %DOCKER_DESKTOP%
    echo Start Docker Desktop manually, then run this file again.
    pause
    exit /b 1
  )
)

docker compose -f "%PROJECT_DIR%docker-compose.yml" up -d
if errorlevel 1 (
  echo Failed to start PostgreSQL container.
  pause
  exit /b 1
)

timeout /t 5 /nobreak >nul

start "Backend" cmd /k "cd /d ""%PROJECT_DIR%backend"" && npm run dev"
start "Frontend" cmd /k "cd /d ""%PROJECT_DIR%frontend"" && npm run dev"

endlocal
exit /b 0

:wait_for_docker
docker info >nul 2>&1
if errorlevel 1 (
  timeout /t 5 /nobreak >nul
  goto wait_for_docker
)
exit /b 0
