'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { LogOut } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useActionState } from "react";
import { logout } from "@/app/action/auth";

export const AccountMenu = () => {
  const [_state, action, pending] = useActionState(logout, undefined)

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/yudhistiaR311024.png" />
                  <AvatarFallback>
                    <Spinner />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    M.Yudhistia Rahman
                  </span>
                  <span className="truncate text-xs">
                    yudhistia311024@gmail.com
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <form action={action} className="w-full">
                  <button type="submit" className="w-full flex gap-2 items-center" disabled={pending}>
                    {pending ? <><Spinner /> Processing...</> : (
                      <>
                        <LogOut /> Keluar
                      </>
                    )}
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
