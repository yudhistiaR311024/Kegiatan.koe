"use client";

import AppLogo from "../Logo";
import { Button } from "../ui/button";
import { PanelRightOpen, PanelLeftOpen } from "lucide-react";
import { useNavbar } from "@/contexts/NavbarContext";
import OrganizationList from "../OrganizationList";
import UserProfile from "../UserProfile";

const Navbar = () => {
  const { isOpen, toggle } = useNavbar();

  return (
    <nav className="fixed top-0 left-0 bg-white px-4 w-full h-16 shadow shadow-b flex items-center justify-between z-50">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => toggle()}
          size="icon-sm"
          variant="outline"
          className="cursor-pointer"
        >
          {isOpen ? <PanelLeftOpen /> : <PanelRightOpen />}
        </Button>
        <AppLogo />
      </div>
      <div className="flex items-center gap-2">
        <OrganizationList />
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
