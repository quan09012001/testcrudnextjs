"use client";
import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname từ Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faUserTie, faBriefcase, faTags, faUser, faWarehouse, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname(); // Lấy URL hiện tại

  return (
    <div className="bg-white shadow-lg h-screen p-6 w-[20%] shadow-md">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">YoungTech</h2>
      <ul className="space-y-4">
        <li className={`flex items-center ${pathname === "/admin" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faHome} className="mr-2 icon-size" />
          <Link href="/admin">Trang chủ</Link>
        </li>
        <li className={`flex items-center ${pathname === "/admin/employee" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faUsers} className="mr-2 icon-size" />
          <Link href="/admin/employee">Quản lý nhân viên</Link>
        </li>
        <li className={`flex items-center ${pathname === "/admin/sale" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faUserTie} className="mr-2 icon-size" />
          <Link href="/admin/sale">Quản lý bán hàng</Link>
        </li>
        <li className={`flex items-center ${pathname === "/admin/business" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faBriefcase} className="mr-2 icon-size" />
          <Link href="/admin/business">Quản lý kinh doanh</Link>
        </li>
        <li className={`flex items-center ${pathname === "/admin/categories-parent" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faTags} className="mr-2 icon-size" />
          <Link href="/admin/categories-parent">Quản lý danh mục sản phẩm</Link>
        </li>
        <li className={`flex items-center ${pathname === "/admin/suppliers" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faUser} className="mr-2 icon-size" />
          <Link href="/admin/suppliers">Quản lý nhà cung cấp</Link>
        </li>
        <li className={`flex items-center ${pathname === "/admin/inventory" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faWarehouse} className="mr-2 icon-size" />
          <Link href="/admin/inventory">Quản lý nhập kho hàng</Link>
        </li>
        <li className={`flex items-center ${pathname === "/admin/invoices" ? "text-blue-500" : "text-gray-700"} hover:text-blue-500 transition-colors`}>
          <FontAwesomeIcon icon={faFileInvoice} className="mr-2 icon-size" />
          <Link href="/admin/invoices">Danh sách hoá đơn</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;