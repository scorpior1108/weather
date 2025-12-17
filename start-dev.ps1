# 天气应用开发服务器启动脚本
Write-Host "正在启动天气应用开发服务器..." -ForegroundColor Green
Write-Host "服务器将绑定到所有网络接口，允许外部访问" -ForegroundColor Yellow

# 获取本机IP地址
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "以太网","Wi-Fi","本地连接*" | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.*"}).IPAddress | Select-Object -First 1

if ($ipAddress) {
    Write-Host "本地访问地址: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "网络访问地址: http://$ipAddress`:3000" -ForegroundColor Cyan
} else {
    Write-Host "本地访问地址: http://localhost:3000" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Red
Write-Host ""

# 启动开发服务器
npm run dev