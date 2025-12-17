import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许外部访问
  experimental: {
    // 禁用严格的主机检查
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      // 添加你的IP地址或域名
    ],
  },
  // 确保在开发模式下允许外部主机
  async rewrites() {
    return [];
  },
  // 设置端口和其他配置
  port: 3000,
};

export default nextConfig;
