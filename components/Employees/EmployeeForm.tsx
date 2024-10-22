'use client';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createEmployee, updateEmployee } from "@/store/slices/employeeSlice";
import { AppDispatch } from "@/store/store";

interface EmployeeFormProps {
    employee?: any;
    onCancel?: () => void;
    onSubmitSuccess?: () => void; // Hàm được gọi khi form submit thành công
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onCancel, onSubmitSuccess }) => {
    const [fullName, setFullName] = useState(employee?.fullName || '');
    const [profilePicture, setProfilePicture] = useState(employee?.profilePicture || '');
    const [email, setEmail] = useState(employee?.email || '');
    const [password, setPassword] = useState(employee?.password || '');
    const [dayOfBirth, setDayOfBirth] = useState(employee?.dayOfBirth || '');
    const [phoneNumber, setPhoneNumber] = useState(employee?.phoneNumber || '');
    const [position, setPosition] = useState(employee?.position || '');
    const [accountId, setAccountId] = useState(employee?.accountId || 1);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (employee) {
            setFullName(employee.fullName);
            setProfilePicture(employee.profilePicture);
            setEmail(employee.email);
            setPassword(employee.password);
            setPhoneNumber(employee.phoneNumber);
            setDayOfBirth(employee.dayOfBirth);
            setPosition(employee.position);
            setAccountId(employee.accountId);
        }
    }, [employee]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emp = {
            id: employee ? employee.id : undefined,
            fullName,
            profilePicture,
            email,
            password,
            phoneNumber,
            dayOfBirth,
            position,
            accountId,
        };

        if (employee) {
            dispatch(updateEmployee(emp));

        } else {
            dispatch(createEmployee(emp));
        }

        if (onSubmitSuccess) {
            onSubmitSuccess(); // Gọi hàm onSubmitSuccess khi thành công
        }

        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl mb-4">{employee ? `Chỉnh sửa thông tin nhân viên ${fullName}` : 'Thêm nhân viên'}</h2>
            <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Nhập họ tên nhân viên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
            />
            <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Link hình ảnh nhân viên"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                required
                pattern="https?://.+"
            />
            <input
                className="border p-2 w-full mb-2"
                type="email"
                placeholder="Email nhân viên"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
            />
            <input
                className="border p-2 w-full mb-2"
                type="password"
                placeholder="Mật khẩu nhân viên"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <input
                className="border p-2 w-full mb-2"
                type="number"
                placeholder="Số điện thoại nhân viên"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(Number(e.target.value))}
                required
                min="100000000"
                max="999999999"
            />
            <input
                className="border p-2 w-full mb-2"
                type="date"
                placeholder="Ngày tháng năm sinh nhân viên"
                value={dayOfBirth}
                onChange={(e) => setDayOfBirth(e.target.value)}
                required
                min={new Date(1900, 0, 1).toISOString().split('T')[0]}
                max={new Date().toISOString().split('T')[0]}
            />
            <select
                className="border p-2 w-full mb-2"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
            >
                <option value="">Chọn vai trò</option>
                <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                <option value="Nhân viên kinh doanh">Nhân viên kinh doanh</option>
                <option value="Thủ kho">Thủ kho</option>
            </select>

            <input
                className="border p-2 w-full mb-2"
                type="number"
                placeholder="id nhân viên"
                value={accountId}
                onChange={(e) => setAccountId(Number(e.target.value))}
                required
                min="1"
            />
            <button className="bg-blue-500 text-white p-2 w-full mb-2" type="submit">
                {employee ? 'Cập nhật thông tin' : 'Thêm nhân viên'}
            </button>
            {onCancel && (
                <button
                    className="bg-gray-500 text-white p-2 w-full"
                    type="button" onClick={onCancel}
                >
                    Huỷ
                </button>
            )}
        </form>
    );
};

export default EmployeeForm;
