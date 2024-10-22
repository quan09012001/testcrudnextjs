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
                    <th className="py-2 px-4 border-b">Họ tên</th>
                    <th className="py-2 px-4 border-b">Ảnh đại diện</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Số điện thoại</th>
                    <th className="py-2 px-4 border-b">Ngày sinh</th>
                    <th className="py-2 px-4 border-b">Vai trò</th>
                    <th className="py-2 px-4 border-b">accountId</th>
                    <th colSpan={2} className="py-2 px-4 border-b">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {data.map((employee) => (
                    <tr key={employee.id}>
                        <td className="py-2 px-4 border-b">{employee.fullName}</td>
                        <td className="py-2 px-4 border-b">
                            <img src={employee.profilePicture}
                                alt={employee.fullName}
                                style={{ width: '100px', height: '100px' }}
                            />
                        </td>
                        <td className="py-2 px-4 border-b">{employee.email}</td>
                        <td className="py-2 px-4 border-b">0{employee.phoneNumber}</td>
                        <td className="py-2 px-4 border-b">{employee.dayOfBirth}</td>
                        <td className="py-2 px-4 border-b">{employee.position}</td>
                        <td className="py-2 px-4 border-b">{employee.accountId}</td>
                        <td className="py-2 border-b">
                            <button
                                className="bg-blue-500 text-white px-4 py-2"
                                onClick={() => onEdit(employee)} // Khi nhấn "Edit", gọi hàm onEdit
                            >
                                Sửa
                            </button>
                        </td>
                        <td className="py-2 border-b">
                            <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => handleDelete(employee.id!)} // Khi nhấn "Delete", gọi hàm handleDelete
                            >
                                Xoá
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeList;
