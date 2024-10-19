'use client';
import React, { useState } from "react";
import EmployeeForm from "@/components/Employees/EmployeeForm";
import EmployeeList from "@/components/Employees/EmployeeList";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EmployeePage = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

    const handleEdit = (employee: any) => {
        setSelectedEmployee(employee); // Chọn employee cần chỉnh sửa
    };

    const handleCancel = () => {
        setSelectedEmployee(null); // Hủy bỏ chỉnh sửa
    };

    const handleSubmitSuccess = () => {
        setSelectedEmployee(null); // Sau khi submit thành công, hủy chỉnh sửa
        toast.success("Operation successful!"); // Thông báo thành công
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
            <EmployeeForm
                employee={selectedEmployee}
                onCancel={handleCancel}
                onSubmitSuccess={handleSubmitSuccess}
            />
            <EmployeeList onEdit={handleEdit} />
            <ToastContainer />
        </div>
    );
};

export default EmployeePage;
