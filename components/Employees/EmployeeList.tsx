'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "@/store/slices/employeeSlice";
import { RootState, AppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import Popup from "@/components/Popup";

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

    // popup
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    const openPopup = (employee: any) => {
        setSelectedEmployee(employee);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setSelectedEmployee(null); // Đặt lại nhân viên đã chọn khi đóng popup
    };

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
        <>
            <table className="min-w-full bg-white border border-gray-200 mt-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Họ tên</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Số điện thoại</th>
                        <th className="py-2 px-4 border-b">Vai trò</th>
                        <th colSpan={3} className="py-2 px-4 border-b">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee) => (
                        <tr key={employee.id}>
                            <td className="py-2 px-4 border-b">{employee.fullName}</td>
                            <td className="py-2 px-4 border-b">{employee.email}</td>
                            <td className="py-2 px-4 border-b">0{employee.phoneNumber}</td>
                            <td className="py-2 px-4 border-b">{employee.position}</td>
                            <div className="flex space-x-2">
                            <td className="py-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2"
                                    onClick={() => openPopup(employee)}
                                >
                                    Xem
                                </button>
                            </td>
                            <td className="py-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2"
                                    onClick={() => onEdit(employee)} // Khi nhấn "Edit", gọi hàm onEdit
                                >
                                    Sửa
                                </button>
                            </td>
                            <td className="py-2">
                                <button
                                    className="bg-red-500 text-white px-4 py-2"
                                    onClick={() => handleDelete(employee.id!)}
                                >
                                    Xoá
                                </button>
                            </td>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isPopupOpen && selectedEmployee && (
                <Popup isOpen={isPopupOpen} onClose={closePopup}>
                    <h2>Thông tin nhân viên</h2>
                    <p>Họ tên: {selectedEmployee.fullName}</p>
                    <img
                        src={selectedEmployee.profilePicture}
                        alt={selectedEmployee.fullName}
                        style={{ width: '150px', height: '150px' }}
                    />
                    <p>Email: {selectedEmployee.email}</p>
                    <p>Số điện thoại: 0{selectedEmployee.phoneNumber}</p>
                    <p>Ngày sinh: {selectedEmployee.dayOfBirth}</p>
                    <p>Vai trò: {selectedEmployee.position}</p>
                    <p>accountId: {selectedEmployee.accountId}</p>
                    <button className="mt-4 bg-red-500 text-white px-4 py-2" onClick={closePopup}>
                        Đóng
                    </button>
                </Popup>
            )}
        </>
    );
};

export default EmployeeList;
