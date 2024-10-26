'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, deleteEmployee, fetchEmployees, updateEmployee } from "@/store/slices/employeeSlice";
import { RootState, AppDispatch } from "@/store/store";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Employee } from "@/store/slices/employeeSlice";
import { storage } from "@/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Calendar } from 'primereact/calendar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList: React.FC = () => {
    const { data, loading } = useSelector((state: RootState) => state.employee);
    const dispatch = useDispatch<AppDispatch>();

    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupAddOpen, setPopupAddOpen] = useState(false);
    const [isPopupEditOpen, setPopupEditOpen] = useState(false);
    const [isPopupViewOpen, setPopupViewOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
        fullName: '',
        profilePicture: '',
        email: '',
        password: '',
        phoneNumber: '',
        dayOfBirth: '',
        position: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false); // Thêm state để kiểm tra trạng thái tải lên

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const openAddPopup = () => {
        setSelectedEmployee({
            fullName: '',
            profilePicture: '',
            email: '',
            password: '',
            phoneNumber: '',
            dayOfBirth: '',
            position: '',
        });
        setPopupAddOpen(true);
        setImageFile(null); // Reset hình ảnh khi mở popup thêm
    };

    const openEditPopup = (employee: Employee) => {
        setSelectedEmployee(employee);
        setPopupEditOpen(true);
        setImageFile(null); // Reset hình ảnh khi mở popup chỉnh sửa
    };

    const openViewPopup = (employee: Employee) => {
        setSelectedEmployee(employee);
        setPopupViewOpen(true);
    };

    const closePopup = () => {
        setPopupAddOpen(false);
        setPopupEditOpen(false);
        setPopupViewOpen(false);
        setImageFile(null);
        setIsUploading(false); // Reset trạng thái tải lên
    };

    const handleImageUpload = async () => {
        if (!imageFile) return null;
        const imageRef = ref(storage, `employees/${Date.now()}_${imageFile.name}`);
        setIsUploading(true); // Đánh dấu đang tải lên
        await uploadBytes(imageRef, imageFile);
        const downloadURL = await getDownloadURL(imageRef);
        setIsUploading(false); // Kết thúc trạng thái tải lên
        return downloadURL;
    };

    const handleAddEmployee = async () => {
        try {
            const profilePicture = imageFile ? await handleImageUpload() : "";
            await dispatch(createEmployee({ ...selectedEmployee, profilePicture: profilePicture ?? "" })).unwrap();
            toast.success("Thêm nhân viên thành công!");
            closePopup();
        } catch (error) {
            console.error("Failed to add employee:", error);
            toast.error("Thêm nhân viên thất bại!");
        }
    };

    const handleEditEmployee = async () => {
        try {
            const profilePicture = imageFile
                ? await handleImageUpload()
                : selectedEmployee.profilePicture;

            await dispatch(updateEmployee({ ...selectedEmployee, profilePicture: profilePicture || '' })).unwrap();
            toast.success("Cập nhật nhân viên thành công!");
            closePopup();
        } catch (error) {
            console.error("Failed to update employee:", error);
            toast.error("Cập nhật nhân viên thất bại!");
        }
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Bạn có thực sự muốn xoá nhân viên này không?");
        if (confirmDelete) {
            try {
                await dispatch(deleteEmployee(id)).unwrap();
                toast.success("Xóa nhân viên thành công!");
            } catch (error) {
                console.error("Failed to delete employee:", error);
                toast.error("Xóa nhân viên thất bại!");
            }
        }
    };

    const filteredEmployees = data.filter((employee) =>
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const actionBodyTemplate = (employee: Employee) => (
        <>
            <Button
                icon="pi pi-eye"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => openViewPopup(employee)}
                tooltip="Xem"
            />
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => openEditPopup(employee)}
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
            <ToastContainer />
            <div className="flex justify-between mb-3">
                <Button label="Thêm Nhân Viên" icon="pi pi-plus" className="p-button-success" onClick={openAddPopup} />
                <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm nhân viên..."
                />
            </div>

            <DataTable value={filteredEmployees} paginator rows={8} className="mt-4">
                <Column field="id" header="STT" body={(_, { rowIndex }) => rowIndex + 1} style={{ textAlign: 'center', width: '5rem' }} />
                <Column field="fullName" header="Họ tên" />
                <Column field="email" header="Email" />
                <Column field="phoneNumber" header="Số điện thoại" body={(rowData) => '0' + rowData.phoneNumber} />
                <Column field="position" header="Vai trò" />
                <Column body={actionBodyTemplate} header="Hành động" style={{ textAlign: 'center', width: '12rem' }} />
            </DataTable>


            {/* Add Employee Dialog */}
            <Dialog header="Thêm Nhân Viên" visible={isPopupAddOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label>Họ tên</label>
                        <InputText value={selectedEmployee.fullName} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fullName: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Hình ảnh</label>
                        <InputText type="file" onChange={(e) => {
                            const file = e.target.files?.[0];
                            setImageFile(file ?? null);
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setSelectedEmployee({ ...selectedEmployee, profilePicture: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                            }
                        }} />
                        {selectedEmployee.profilePicture && <img src={selectedEmployee.profilePicture} alt="Preview" className="mt-2 w-full h-auto" />}
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <InputText value={selectedEmployee.email} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Số điện thoại</label>
                        <InputText value={selectedEmployee.phoneNumber} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phoneNumber: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Ngày sinh</label>
                        <Calendar value={selectedEmployee.dayOfBirth ? new Date(selectedEmployee.dayOfBirth) : null} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dayOfBirth: (e.value as Date).toISOString().split('T')[0] })} dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-field">
                        <label>Vai trò</label>
                        <InputText value={selectedEmployee.position} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })} />
                    </div>
                    <Button label="Lưu" icon="pi pi-check" className="mt-2" onClick={handleAddEmployee} disabled={isUploading} />
                </div>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog header="Chỉnh Sửa Nhân Viên" visible={isPopupEditOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    {/* Các trường giống như trên popup thêm */}
                    <div className="p-field">
                        <label>Họ tên</label>
                        <InputText value={selectedEmployee.fullName} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fullName: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Hình ảnh</label>
                        <InputText type="file" onChange={(e) => {
                            const file = e.target.files?.[0];
                            setImageFile(file ?? null);
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setSelectedEmployee({ ...selectedEmployee, profilePicture: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                            }
                        }} />
                        {selectedEmployee.profilePicture && <img src={selectedEmployee.profilePicture} alt="Preview" className="mt-2 w-full h-auto" />}
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <InputText value={selectedEmployee.email} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Số điện thoại</label>
                        <InputText value={selectedEmployee.phoneNumber} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phoneNumber: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label>Ngày sinh</label>
                        <Calendar value={selectedEmployee.dayOfBirth ? new Date(selectedEmployee.dayOfBirth) : null} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dayOfBirth: (e.value as Date).toISOString().split('T')[0] })} dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-field">
                        <label>Vai trò</label>
                        <InputText value={selectedEmployee.position} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })} />
                    </div>
                    <Button label="Cập nhật" icon="pi pi-check" className="mt-2" onClick={handleEditEmployee} disabled={isUploading} />
                </div>
            </Dialog>

            {/* View Employee Dialog */}
            <Dialog header="Chi Tiết Nhân Viên" visible={isPopupViewOpen} style={{ width: '450px' }} onHide={closePopup}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label>Họ tên</label>
                        <div>{selectedEmployee.fullName}</div>
                    </div>
                    <div className="p-field">
                        <label>Hình ảnh</label>
                        {selectedEmployee.profilePicture && <img src={selectedEmployee.profilePicture} alt="Profile" className="mt-2 w-full h-auto" />}
                    </div>
                    <div className="p-field">
                        <label>Email</label>
                        <div>{selectedEmployee.email}</div>
                    </div>
                    <div className="p-field">
                        <label>Số điện thoại</label>
                        <div>{selectedEmployee.phoneNumber}</div>
                    </div>
                    <div className="p-field">
                        <label>Ngày sinh</label>
                        <div>{selectedEmployee.dayOfBirth}</div>
                    </div>
                    <div className="p-field">
                        <label>Vai trò</label>
                        <div>{selectedEmployee.position}</div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default EmployeeList;
