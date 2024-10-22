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
        <form onSubmit={handleSubmit} style={{width: 500}} className="space-y-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">{employee ? `Cập nhật thông tin cho ${fullName}` : 'Thêm nhân viên'}</h2>
            <div className="grid grid-cols-1 gap-4">
                <input
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="text"
                    placeholder="Nhập họ tên nhân viên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="text"
                    placeholder="Link hình ảnh nhân viên"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                    required
                    pattern="https?://.+"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="email"
                    placeholder="Email nhân viên"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="password"
                    placeholder="Mật khẩu nhân viên"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="number"
                    placeholder="Số điện thoại nhân viên"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(Number(e.target.value))}
                    required
                    min="100000000"
                    max="999999999"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="date"
                    value={dayOfBirth}
                    onChange={(e) => setDayOfBirth(e.target.value)}
                    required
                    min={new Date(1900, 0, 1).toISOString().split('T')[0]}
                    max={new Date().toISOString().split('T')[0]}
                />
                <select
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="number"
                    placeholder="id nhân viên"
                    value={accountId}
                    onChange={(e) => setAccountId(Number(e.target.value))}
                    required
                    min="1"
                />
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full transition" type="submit">
                {employee ? 'Cập nhật thông tin' : 'Thêm nhân viên'}
            </button>
            {onCancel && (
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg w-full mt-2 transition"
                    type="button" onClick={onCancel}
                >
                    Huỷ
                </button>
            )}
        </form>
    );
};

export default EmployeeForm;
