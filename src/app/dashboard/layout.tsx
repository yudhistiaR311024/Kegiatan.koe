import * as React from "react";
import MainLayout from "@/components/Layouts/MainLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default DashboardLayout;
