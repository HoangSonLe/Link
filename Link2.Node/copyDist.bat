REM robocopy ".\src\contents" ".\dist\Contents" /S /E /nfl /ndl /njh /njs
robocopy ".\src\assets" ".\dist\assets" /S /E /nfl /ndl /njh /njs
robocopy ".\dist" "..\Link2.Web\dist" /S /E /nfl /ndl /njh /njs
REM robocopy ".\dist" ".\public\dist" /S /E /nfl /ndl /njh /njs
EXIT 0