import EmployeeList from "@/components/Employees/EmployeeList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lý nhân viên",
    description: "Quản lý nhân viên",
};

export default function Home() {
  return (
    <>
      <EmployeeList />
    </>
  );
}