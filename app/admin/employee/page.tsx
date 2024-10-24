import EmployeePage from "@/components/Employees/EmployeePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lý nhân viên",
    description: "Quản lý nhân viên",
};

export default function Home() {
  return (
    <>
      <EmployeePage />
    </>
  );
}