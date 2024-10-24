import SalePage from "@/components/Sales/SalePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lý bán hàng",
    description: "Quản lý bán hàng",
};

export default function Home() {
  return (
    <>
      <SalePage />
    </>
  );
}