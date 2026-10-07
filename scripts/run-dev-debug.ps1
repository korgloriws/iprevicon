$ErrorActionPreference = "Continue"
Set-Location "C:\Users\mateu\Downloads\iprevicon-main"
$env:PATH = "C:\Program Files\nodejs;C:\Users\mateu\AppData\Roaming\npm;" + $env:PATH

# free ports
foreach ($port in 3000, 3001) {
  Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
    ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
}
Start-Sleep -Seconds 1

$log = Join-Path (Get-Location) "dev-crash.log"
"=== start $(Get-Date -Format o) node=$(node -v) ===" | Set-Content $log -Encoding UTF8

$nextJs = Join-Path (Get-Location) "node_modules\next\dist\bin\next"
$node = "C:\Program Files\nodejs\node.exe"

# Keep a forever-open stdin so Next does not exit on EOF (non-TTY)
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $node
$psi.Arguments = "`"$nextJs`" dev -H 127.0.0.1 -p 3000"
$psi.WorkingDirectory = (Get-Location).Path
$psi.UseShellExecute = $false
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.RedirectStandardInput = $true
$psi.CreateNoWindow = $true
$psi.EnvironmentVariables["FORCE_COLOR"] = "0"
$psi.EnvironmentVariables["CI"] = "1"

$p = New-Object System.Diagnostics.Process
$p.StartInfo = $psi
[void]$p.Start()

$readerOut = $p.StandardOutput
$readerErr = $p.StandardError

$jobOut = Start-Job -ScriptBlock {
  param($r, $log)
  while ($null -ne ($line = $r.ReadLine())) {
    Add-Content -Path $log -Value "[OUT] $line"
  }
} -ArgumentList $readerOut, $log

$jobErr = Start-Job -ScriptBlock {
  param($r, $log)
  while ($null -ne ($line = $r.ReadLine())) {
    Add-Content -Path $log -Value "[ERR] $line"
  }
} -ArgumentList $readerErr, $log

$aliveSec = 0
$maxSec = 40
while (-not $p.HasExited -and $aliveSec -lt $maxSec) {
  Start-Sleep -Seconds 2
  $aliveSec += 2
  Add-Content $log "tick=${aliveSec}s listening=$(@(Get-NetTCPConnection -LocalPort 3000 -State Listen -EA SilentlyContinue).Count)"
}

if ($p.HasExited) {
  Add-Content $log "EXIT_CODE=$($p.ExitCode) after ${aliveSec}s"
  "EXITED code=$($p.ExitCode)"
} else {
  try {
    $r = Invoke-WebRequest "http://127.0.0.1:3000/" -UseBasicParsing -TimeoutSec 45
    Add-Content $log "HTTP=$($r.StatusCode)"
    "HTTP $($r.StatusCode)"
  } catch {
    Add-Content $log "HTTP_FAIL=$($_.Exception.Message)"
    "HTTP_FAIL"
  }
  Start-Sleep -Seconds 8
  if ($p.HasExited) {
    Add-Content $log "EXIT_AFTER_REQUEST code=$($p.ExitCode)"
    "EXITED_AFTER_REQUEST $($p.ExitCode)"
  } else {
    Add-Content $log "STILL_ALIVE_AFTER_REQUEST"
    "STILL_ALIVE"
    $p.Kill()
  }
}

Start-Sleep -Seconds 1
Receive-Job $jobOut -ErrorAction SilentlyContinue | Out-Null
Receive-Job $jobErr -ErrorAction SilentlyContinue | Out-Null
Remove-Job $jobOut, $jobErr -Force -ErrorAction SilentlyContinue
Get-Content $log
