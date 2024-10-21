'use client';  // Chỉ định đây là Client Component
import React from "react";
import Image from "next/image";
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
        const confirmDelete = window.confirm("Bạn có thực sự muốn xoá nhân viên này không?");
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
                    <th className="py-2 px-4 border-b">fullName</th>
                    <th className="py-2 px-4 border-b">profilePicture</th>
                    <th className="py-2 px-4 border-b">email</th>
                    <th className="py-2 px-4 border-b">password</th>
                    <th className="py-2 px-4 border-b">phoneNumber</th>
                    <th className="py-2 px-4 border-b">dayOfBirth</th>
                    <th className="py-2 px-4 border-b">position</th>
                    <th className="py-2 px-4 border-b">accountId</th>
                    <th colSpan={2} className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((employee) => (
                    <tr key={employee.id}>
                        <td className="py-2 px-4 border-b">{employee.fullName}</td>
                        <td className="py-2 px-4 border-b">
                            {employee.profilePicture && (
                                <Image
                                    src={employee.profilePicture}
                                    alt={employee.fullName}
                                    width={100} // Kích thước width cho hình ảnh
                                    height={100} // Kích thước height cho hình ảnh
                                    priority
                                />)}
                        </td>
                        <td className="py-2 px-4 border-b">{employee.email}</td>
                        <td className="py-2 px-4 border-b">{employee.password}</td>
                        <td className="py-2 px-4 border-b">{employee.phoneNumber}</td>
                        <td className="py-2 px-4 border-b">{employee.dayOfBirth}</td>
                        <td className="py-2 px-4 border-b">{employee.position}</td>
                        <td className="py-2 px-4 border-b">{employee.accountId}</td>
                        <td className="py-2 border-b">
                            <button
                                className="bg-blue-500 text-white px-4 py-2"
                                onClick={() => onEdit(employee)} // Khi nhấn "Edit", gọi hàm onEdit
                            >
                                Edit
                            </button>
                        </td>
                        <td className="py-2 border-b">
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
