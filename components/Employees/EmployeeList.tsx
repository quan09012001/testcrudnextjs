'use client';  // Chỉ định đây là Client Component

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "@/store/slices/employeeSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface EmployeeListProps {
    onEdit: (employee: any) => void; // Hàm để chỉnh sửa employee
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
    const { data, loading } = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();

    // Lấy danh sách employees khi component được mount
    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    // Hàm xử lý khi nhấn nút xóa
    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            try {
                toast.success("Employee deleted successfully!"); // Thông báo thành công khi xóa
                await dispatch(deleteEmployee(id)).unwrap(); // Dùng unwrap để lấy giá trị trả về
            } catch (error) {
                toast.error("Failed to delete employee!"); // Thông báo lỗi
            }
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Age</th>
                    <th className="py-2 px-4 border-b">Department</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((employee) => (
                    <tr key={employee.id}>
                        <td className="py-2 px-4 border-b">{employee.name}</td>
                        <td className="py-2 px-4 border-b">{employee.age}</td>
                        <td className="py-2 px-4 border-b">{employee.department}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mr-2"
                                onClick={() => onEdit(employee)} // Khi nhấn "Edit", gọi hàm onEdit
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => handleDelete(employee.id!)} // Khi nhấn "Delete", gọi hàm handleDelete
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeList;
