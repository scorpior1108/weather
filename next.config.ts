import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 中允许外部访问的正确配置
  // 在开发模式下，默认允许外部主机访问
  // 生产环境部署时通过环境变量控制
  
  // 确保在开发模式下允许外部主机
  async rewrites() {
    return [];
  },
};

export default nextConfig;
