"use client";

import * as React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../Sidebar/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <main className="bg-muted/50 min-h-dvh flex-1 rounded-xl md:min-h-min">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
