@echo off
color 0b
title Gestor Apps Matematicas
echo ===================================================
echo     Actualitzant i Obrint Gestor de Matematiques
echo                  (Versio Estatica)
echo ===================================================
echo.
echo Detectant aplicacions a les subcarpetes i generant JS...
python generar_apps.py
echo.
echo Tot llest! Obrint el navegador...
start index.html
echo.
echo Pots tancar aquesta finestra quan vulguis.
pause >nul
