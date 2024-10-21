"use client";
import React, { useState } from "react";
import Sidebar from "@/components/AdminLayout/sidebar";
import Header from "@/components/AdminLayout/header";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content where the {children} will be rendered */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;