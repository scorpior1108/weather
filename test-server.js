const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>天气应用测试</title>
    </head>
    <body>
      <h1>天气应用服务器测试成功！</h1>
      <p>如果你能看到这个页面，说明服务器正在运行。</p>
      <p>本地访问: <a href="http://localhost:3000">http://localhost:3000</a></p>
      <script>
        // 显示用户的访问地址
        document.write('<p>你的访问地址: ' + window.location.href + '</p>');
      </script>
    </body>
    </html>
  `);
});

const PORT = 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`服务器正在运行:`);
  console.log(`本地访问: http://localhost:${PORT}`);
  console.log(`网络访问: http://[你的IP地址]:${PORT}`);
  console.log(`绑定地址: ${HOST}:${PORT}`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});