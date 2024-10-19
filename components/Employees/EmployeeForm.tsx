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
    const [name, setName] = useState(employee?.name || '');
    const [age, setAge] = useState(employee?.age || 0);
    const [department, setDepartment] = useState(employee?.department || '');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setAge(employee.age);
            setDepartment(employee.department);
        }
    }, [employee]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emp = {
            id: employee ? employee.id : undefined,
            name,
            age,
            department
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
            <h2 className="text-xl mb-4">{employee ? 'Edit Employee' : 'Add Employee'}</h2>
            <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                className="border p-2 w-full mb-2"
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                required
            />
            <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
            />
            <button className="bg-blue-500 text-white p-2 w-full mb-2" type="submit">
                {employee ? 'Update' : 'Create'}
            </button>
            {onCancel && (
                <button
                    className="bg-gray-500 text-white p-2 w-full"
                    type="button" onClick={onCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default EmployeeForm;
