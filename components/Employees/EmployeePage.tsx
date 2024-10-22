'use client';
import React, { useState } from "react";
import EmployeeForm from "@/components/Employees/EmployeeForm";
import EmployeeList from "@/components/Employees/EmployeeList";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Popup from "@/components/Popup";

const EmployeePage = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

    const handleEdit = (employee: any) => {
        setSelectedEmployee(employee); // Chọn employee cần chỉnh sửa
        openPopup();
    };

    const handleCancel = () => {
        setSelectedEmployee(null); // Hủy bỏ chỉnh sửa
        closePopup();
    };

    const handleSubmitSuccess = () => {
        setSelectedEmployee(null); // Sau khi submit thành công, hủy chỉnh sửa
        toast.success("Operation successful!"); // Thông báo thành công
    };
    // popup
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };
    return (
        <div className="p-4">
            <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded" onClick={openPopup}>Thêm nhân viên</button>
            <Popup isOpen={isPopupOpen} onClose={closePopup}>
                <h1 className="text-2xl font-bold mb-4">Quản lý nhân viên</h1>
                <EmployeeForm
                    employee={selectedEmployee}
                    onCancel={handleCancel}
                    onSubmitSuccess={handleSubmitSuccess}
                />
            </Popup>
            <EmployeeList onEdit={handleEdit} />
            <ToastContainer />
        </div>
    );
};

export default EmployeePage;
