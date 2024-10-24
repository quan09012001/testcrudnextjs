'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "@/store/slices/employeeSlice";
import { RootState, AppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import Popup from "@/components/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEdit,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

interface EmployeeListProps {
    onEdit: (employee: any) => void; // Hàm để chỉnh sửa employee
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
    const { data, loading } = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();

    // State để quản lý trang hiện tại và số lượng item trên mỗi trang
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Số lượng item hiển thị trên mỗi trang

    // popup
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    // Lấy danh sách employees khi component được mount
    useEffect(() => {
        // Gọi API với trang hiện tại và số lượng item mỗi trang
        dispatch(fetchEmployees());
    }, [dispatch]);

    // Xử lý thay đổi trang
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected); // Cập nhật trang hiện tại
    };

    // Lấy danh sách nhân viên cho trang hiện tại
    const currentData = data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Hàm mở popup
    const openPopup = (employee: any) => {
        setSelectedEmployee(employee);
        setPopupOpen(true);
    };

    // Đóng popup
    const closePopup = () => {
        setPopupOpen(false);
        setSelectedEmployee(null); // Đặt lại nhân viên đã chọn khi đóng popup
    };

    // Hàm xử lý khi nhấn nút xóa
    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Bạn có thực sự muốn xoá nhân viên này không?");
        if (confirmDelete) {
            try {
                await dispatch(deleteEmployee(id)).unwrap(); // Xóa nhân viên trong Redux store
                toast.success("Employee deleted successfully!");

                // Nếu xóa nhân viên ở trang cuối và chỉ còn 1 nhân viên trên trang đó, thì quay về trang trước
                if (currentData.length === 1 && currentPage > 0) {
                    setCurrentPage(currentPage - 1); // Quay lại trang trước nếu trang hiện tại không còn dữ liệu
                }

                // Fetch lại danh sách nhân viên sau khi xóa
                await dispatch(fetchEmployees());

            } catch (error) {
                toast.error("Failed to delete employee!");
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
                        <th className="py-2 px-4 border-b">STT</th>
                        <th className="py-2 px-4 border-b">Họ tên</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Số điện thoại</th>
                        <th className="py-2 px-4 border-b">Vai trò</th>
                        <th colSpan={1} className="py-2 px-4 border-b">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((employee, index) => (
                        <tr key={employee.id} className="text-center">
                            <td className="py-2 px-4 border-b">{index + 1 + currentPage * itemsPerPage}</td>
                            <td className="py-2 px-4 border-b">{employee.fullName}</td>
                            <td className="py-2 px-4 border-b">{employee.email}</td>
                            <td className="py-2 px-4 border-b">0{employee.phoneNumber}</td>
                            <td className="py-2 px-4 border-b">{employee.position}</td>

                            <td className="flex-col py-2">
                                <button
                                    className="bg-green-500 text-white px-4 py-2"
                                    onClick={() => openPopup(employee)}
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2"
                                    onClick={() => onEdit(employee)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2"
                                    onClick={() => handleDelete(employee.id!)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(data.length / itemsPerPage)} // Tính lại số trang
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                forcePage={currentPage} // Buộc ReactPaginate hiển thị đúng trang hiện tại
                containerClassName={'flex justify-center items-center space-x-2 mt-4'}
                activeClassName={'bg-green-500 text-white font-bold rounded-full shadow-lg px-4 py-2'}
                pageClassName={'px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all duration-150 ease-in-out shadow-sm'}

                previousClassName={`px-4 py-2 text-white rounded-full ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transition-all duration-150 ease-in-out shadow-md'
                    }`}
                nextClassName={`px-4 py-2 text-white rounded-full ${currentPage === Math.ceil(data.length / itemsPerPage) - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transition-all duration-150 ease-in-out shadow-md'
                    }`}

                disabledClassName={'px-4 py-2 bg-gray-300 text-gray-500 cursor-not-allowed rounded-full'}
            />


            {isPopupOpen && selectedEmployee && (
                <Popup isOpen={isPopupOpen} onClose={closePopup}>
                    <h2 className="text-xl font-bold text-gray-800">Thông tin nhân viên</h2>
                    <div className="flex p-4 bg-white rounded-lg shadow-lg">
                        <img
                            src={selectedEmployee.profilePicture}
                            alt={selectedEmployee.fullName}
                            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg transition duration-300 transform hover:scale-105"
                        />
                        <div className="ml-4 flex flex-col justify-center">
                            <h2 className="text-xl font-bold text-gray-800">{selectedEmployee.fullName}</h2>
                            <p className="text-gray-600">Email: {selectedEmployee.email}</p>
                            <p className="text-gray-600">Số điện thoại: 0{selectedEmployee.phoneNumber}</p>
                            <p className="text-gray-600">Ngày sinh: {selectedEmployee.dayOfBirth}</p>
                            <p className="text-gray-600">Vai trò: {selectedEmployee.position}</p>
                            <p className="text-gray-600">Account ID: {selectedEmployee.accountId}</p>
                            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300" onClick={closePopup}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    );
};

export default EmployeeList;
