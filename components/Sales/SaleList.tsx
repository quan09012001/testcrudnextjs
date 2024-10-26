'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "@/store/slices/employeeSlice";
import { RootState, AppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface EmployeeListProps {
    onEdit: (employee: any) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
    const { data, loading } = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    const openPopup = (employee: any) => {
        setSelectedEmployee(employee);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setSelectedEmployee(null);
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Bạn có thực sự muốn xoá nhân viên này không?");
        if (confirmDelete) {
            try {
                toast.success("Employee deleted successfully!");
                await dispatch(deleteEmployee(id)).unwrap();
            } catch (error) {
                toast.error("Failed to delete employee!");
            }
        }
    };

    const actionBodyTemplate = (employee: any) => (
        <>
            <Button
                icon="pi pi-eye"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => openPopup(employee)}
                tooltip="Xem"
            />
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => onEdit(employee)}
                tooltip="Sửa"
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => handleDelete(employee.id!)}
                tooltip="Xoá"
            />
        </>
    );

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <>
            <DataTable value={data} paginator rows={10} className="mt-4">
                <Column field="fullName" header="Họ tên" />
                <Column field="email" header="Email" />
                <Column field="phoneNumber" header="Số điện thoại" body={(rowData) => '0' + rowData.phoneNumber} />
                <Column field="position" header="Vai trò" />
                <Column body={actionBodyTemplate} header="Hành động" style={{ textAlign: 'center', width: '12rem' }} />
            </DataTable>

            <Dialog header="Thông tin nhân viên" visible={isPopupOpen} style={{ width: '450px' }} onHide={closePopup}>
                {selectedEmployee && (
                    <>
                        <p><strong>Họ tên:</strong> {selectedEmployee.fullName}</p>
                        <img
                            src={selectedEmployee.profilePicture}
                            alt={selectedEmployee.fullName}
                            style={{ width: '150px', height: '150px', border: '1px solid gray', borderRadius: '5px' }}
                        />
                        <p><strong>Email:</strong> {selectedEmployee.email}</p>
                        <p><strong>Số điện thoại:</strong> 0{selectedEmployee.phoneNumber}</p>
                        <p><strong>Ngày sinh:</strong> {selectedEmployee.dayOfBirth}</p>
                        <p><strong>Vai trò:</strong> {selectedEmployee.position}</p>
                        <p><strong>accountId:</strong> {selectedEmployee.accountId}</p>
                    </>
                )}
            </Dialog>
        </>
    );
};

export default EmployeeList;
