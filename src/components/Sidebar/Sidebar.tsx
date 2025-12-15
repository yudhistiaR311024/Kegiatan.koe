"use client";
import { Sidebar } from "../ui/sidebar";
import { AccountMenu } from "./AccountMenu";
import { TeamMenu } from "./TeamMenu";
import { SidebarNavMenu } from "./SidebarMenu";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* Team Menu */}
      <TeamMenu />
      {/* Sidebar Menu */}
      <SidebarNavMenu />
      {/* Acount Menu */}
      <AccountMenu />
    </Sidebar>
  );
}
