@echo off
setlocal EnableDelayedExpansion

echo ================================================================================
echo  Procrastination Analyzer — Setup and Launcher
echo ================================================================================
echo.

set "PROJECT_DIR=%USERPROFILE%\ProcrastinationAnalyzer"
set "REPO_URL=https://github.com/YOUR_GITHUB_USERNAME/procrastination-analyzer.git"
set "DOCKER_DESKTOP=C:\Program Files\Docker\Docker\Docker Desktop.exe"

:: ─── Step 1: Check for Administrator privileges ───────────────────────────────
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [INFO] Running this script as Administrator is recommended for full installation.
    echo.
)

:: ─── Step 2: Detect or install Git ─────────────────────────────────────────────
echo [Step 1/7] Checking Git...
where git >nul 2>&1
if %errorLevel% neq 0 (
    echo [MISSING] Git not found. Installing via winget...
    winget install --id Git.Git --exact --accept-package-agreements --accept-source-agreements --silent
    if %errorLevel% neq 0 (
        echo [ERROR] Git installation failed. Please install Git manually from: https://git-scm.com
        echo Press any key to continue anyway...
        pause >nul
    ) else (
        echo [OK] Git installed successfully.
    )
) else (
    echo [OK] Git is already installed.
)
echo.

:: ─── Step 3: Detect or install Node.js ─────────────────────────────────────────
echo [Step 2/7] Checking Node.js...
where node >nul 2>&1
if %errorLevel% neq 0 (
    echo [MISSING] Node.js not found. Installing via winget...
    winget install --id OpenJS.NodeJS.LTS --exact --accept-package-agreements --accept-source-agreements --silent
    if %errorLevel% neq 0 (
        echo [ERROR] Node.js installation failed. Please install Node.js manually from: https://nodejs.org
        pause
        exit /b 1
    ) else (
        echo [OK] Node.js installed successfully.
    )
) else (
    echo [OK] Node.js is already installed.
)
echo.

:: ─── Step 4: Clone or update the project ───────────────────────────────────────
echo [Step 3/7] Preparing project directory...
if exist "%PROJECT_DIR%" (
    echo [INFO] Project directory already exists at: %PROJECT_DIR%
    echo [INFO] Pulling latest changes...
    git -C "%PROJECT_DIR%" pull
) else (
    echo [INFO] Cloning project from repository...
    git clone "%REPO_URL%" "%PROJECT_DIR%"
    if %errorLevel% neq 0 (
        echo [ERROR] Failed to clone repository.
        echo Please manually download the project from: %REPO_URL%
        echo Extract it to: %PROJECT_DIR%
        pause
        exit /b 1
    ) else (
        echo [OK] Project cloned successfully.
    )
)
echo.

:: ─── Step 5: Detect or install Docker Desktop ───────────────────────────────────
echo [Step 4/7] Checking Docker...
docker info >nul 2>&1
if %errorLevel% neq 0 (
    echo [INFO] Docker engine is not running. Checking Docker Desktop...

    if exist "%DOCKER_DESKTOP%" (
        echo [INFO] Docker Desktop found. Launching...
        start "" "%DOCKER_DESKTOP%"
        echo [INFO] Waiting for Docker Desktop to start (this may take up to 60 seconds)...
        call :wait_for_docker
    ) else (
        echo [MISSING] Docker Desktop not found. Installing via winget...
        winget install --id Docker.DockerDesktop --exact --accept-package-agreements --accept-source-agreements --silent
        if %errorLevel% neq 0 (
            echo [ERROR] Docker Desktop installation failed.
            echo Please install Docker Desktop manually from: https://docs.docker.com/desktop/install/windows-install/
            echo Then run this script again.
            pause
            exit /b 1
        ) else (
            echo [OK] Docker Desktop installed. Launching now...
            start "" "%DOCKER_DESKTOP%"
            echo [INFO] Waiting for Docker Desktop to start (this may take up to 60 seconds)...
            call :wait_for_docker
        )
    )
) else (
    echo [OK] Docker engine is already running.
)
echo.

:: ─── Step 6: Start PostgreSQL container ────────────────────────────────────────
echo [Step 5/7] Starting PostgreSQL container...
docker compose -f "%PROJECT_DIR%\docker-compose.yml" up -d
if %errorLevel% neq 0 (
    echo [ERROR] Failed to start PostgreSQL container.
    echo Make sure Docker is running and docker-compose.yml is present.
    pause
    exit /b 1
) else (
    echo [OK] PostgreSQL container started.
)
echo.

:: ─── Step 7: Install backend dependencies ──────────────────────────────────────
echo [Step 6/7] Installing backend dependencies...
if not exist "%PROJECT_DIR%\backend\node_modules" (
    call npm install --prefix "%PROJECT_DIR%\backend"
    if %errorLevel% neq 0 (
        echo [ERROR] Backend dependency installation failed.
        pause
        exit /b 1
    ) else (
        echo [OK] Backend dependencies installed.
    )
) else (
    echo [OK] Backend dependencies already present.
)
echo.

:: ─── Step 8: Install frontend dependencies ─────────────────────────────────────
echo [Step 7/7] Installing frontend dependencies...
if not exist "%PROJECT_DIR%\frontend\node_modules" (
    call npm install --prefix "%PROJECT_DIR%\frontend"
    if %errorLevel% neq 0 (
        echo [ERROR] Frontend dependency installation failed.
        pause
        exit /b 1
    ) else (
        echo [OK] Frontend dependencies installed.
    )
) else (
    echo [OK] Frontend dependencies already present.
)
echo.

:: ─── Step 9: Launch backend and frontend ──────────────────────────────────────
echo ================================================================================
echo  All systems ready. Launching Procrastination Analyzer...
echo ================================================================================
echo.
echo  - Backend : http://localhost:5000
echo  - Frontend: http://localhost:3000
echo  - API Base: http://localhost:5000/api
echo.
echo  Closing this window will NOT stop the servers.
echo  Use Task Manager to stop node.exe processes to shut down.
echo.
start "Backend — Procrastination Analyzer" cmd /k "cd /d "%PROJECT_DIR%\backend" && npm run dev"
start "Frontend — Procrastination Analyzer" cmd /k "cd /d "%PROJECT_DIR%\frontend" && npm run dev"

endlocal
exit /b 0

:: ─── Helper: Wait for Docker engine to become ready ─────────────────────────────
:wait_for_docker
set "WAIT_COUNT=0"
:docker_wait_loop
timeout /t 5 /nobreak >nul
docker info >nul 2>&1
if %errorLevel% equ 0 (
    echo [OK] Docker engine is running.
    exit /b 0
)
set /a WAIT_COUNT+=1
if %WAIT_COUNT% geq 12 (
    echo [WARNING] Docker did not start within 60 seconds.
    echo Please check Docker Desktop manually and run this script again.
    exit /b 1
)
goto docker_wait_loop