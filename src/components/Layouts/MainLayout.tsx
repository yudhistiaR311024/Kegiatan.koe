"use client";

import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";
import { NavbarProvider } from "@/contexts/NavbarContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavbarProvider>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="container pt-16 mx-auto px-4 md:px-0 mt-2 md:mt-4">
          {children}
        </main>
      </div>
    </NavbarProvider>
  );
};

export default MainLayout;
