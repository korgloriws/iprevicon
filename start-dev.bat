@echo off
title Iprevicon - servidor local
cd /d "%~dp0"

echo.
echo ============================================
echo   Portal Iprevicon
echo   Pasta: %CD%
echo   URL:   http://localhost:3000
echo ============================================
echo.
echo Nao feche esta janela enquanto usar o site.
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Node.js nao encontrado no PATH.
  echo Instale/reabra o terminal apos instalar o Node.
  goto :end
)

node -v
echo.

REM better-sqlite3@11 exige Node 20.x neste projeto (Node 24 do Cursor quebra o binario nativo)
for /f "tokens=1 delims=v." %%a in ('node -v') do set NODEMAJOR=%%a
if not "%NODEMAJOR%"=="20" if not "%NODEMAJOR%"=="22" (
  echo [AVISO] Este projeto foi ajustado para Node 20.
  echo         Voce esta em outra versao. Se cair ao abrir a home,
  echo         use:  "C:\Program Files\nodejs\node.exe" -v
  echo         e rode: npm rebuild better-sqlite3
  echo.
)

REM Libera a porta 3000 se ficou presa de uma execucao anterior
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000.*LISTENING"') do (
  echo Porta 3000 em uso pelo PID %%a — encerrando...
  taskkill /F /PID %%a >nul 2>&1
)

call npm run dev
set EXITCODE=%ERRORLEVEL%

echo.
echo ============================================
echo   O servidor ENCERROU sozinho.
echo   Codigo de saida: %EXITCODE%
echo ============================================
echo.
echo Se caiu sem voce fechar a janela, copie as
echo linhas vermelhas/erros ACIMA e me envie.
echo.

:end
pause
