import React from "react";
import SideNav from "./side-nav"; // 左侧导航栏组件

interface LayoutProps {
  children: React.ReactNode; // 用于接收动态内容
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr]">
      {/* 左侧导航栏 */}
      <SideNav />

      {/* 主内容区域 */}
      <main className="overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;