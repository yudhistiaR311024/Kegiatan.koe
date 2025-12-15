"use client";
import { Sidebar } from "../ui/sidebar";
import { AccountMenu } from "./AccountMenu";
import { TeamMenu } from "./TeamMenu";
import { SidebarNavMenu } from "./SidebarMenu";

const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SIDEBAR_COOKIE_NAME = "sidebar_state";

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
