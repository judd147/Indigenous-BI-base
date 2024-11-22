import React from "react";
import SideNav from "./side-nav"; // 左侧导航栏组件

interface LayoutProps {
  children: React.ReactNode; // 用于接收动态内容
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* 左侧导航栏 */}
      <SideNav />

      {/* 主内容区域 */}
      <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;