import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import { SV_URL } from "./connect";


interface Employee {
    id?: number;
    fullName: string;
    profilePicture: string;
    email: string;
    password: string;
    phoneNumber: string;
    dayOfBirth: string;
    position: string;
    accountId?: number;
}

interface EmployeeState {
    data: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    data: [],
    loading: false,
    error: null,
};

// Thunk để lấy danh sách employees
export const fetchEmployees = createAsyncThunk(
    'employees/fetch',
    async () => {
        const response = await axios.get(`${SV_URL}/employees`);
        return response.data;
    }
);

// Thunk để tạo mới employee
export const createEmployee = createAsyncThunk(
    'employees/create', 
    async (employee: Employee) => {
        const response = await axios.post(`${SV_URL}/employees`, employee);
        return response.data;
    }
);

// Thunk để cập nhật employee
export const updateEmployee = createAsyncThunk(
    'employees/update', 
    async (employee: Employee) => {
        const response = await axios.put(`${SV_URL}/employees/${employee.id}`, employee);
        return response.data;
    }
);

// Thunk để xóa employee
export const deleteEmployee = createAsyncThunk(
    'employees/delete', 
    async (id: number) => {
        await axios.delete(`${SV_URL}/employees/${id}`);
        return id;
    }
);

// Khởi tạo slice
const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Không tìm thấy Employees';
                toast.error('Lỗi khi tải danh sách Employees!');
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.data.push(action.payload);
                toast.success('Tạo mới Employee thành công!');
            })
            .addCase(createEmployee.rejected, (state, action) => {
                toast.error('Lỗi khi tạo mới Employee!');
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.data.findIndex((item: Employee) => item.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                    toast.success('Cập nhật Employee thành công!');
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                toast.error('Lỗi khi cập nhật Employee!');
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.data = state.data.filter((item: Employee) => item.id !== action.payload);
                toast.success('Xóa Employee thành công!');
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                toast.error('Lỗi khi xóa Employee!');
            });
    },
});

export default employeeSlice.reducer;
