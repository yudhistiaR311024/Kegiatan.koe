"use cliend";
import * as React from "react";
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  createContext,
} from "react";

export interface NavbarState {
  isOpen: boolean;
  isScrolled: boolean;
}

export interface NavbarContextValue extends NavbarState {
  toggle: () => void;
  close: () => void;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarContext.Provider value={{ isOpen, isScrolled, toggle, close }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const ctx = useContext(NavbarContext);
  if (!ctx) {
    throw new Error("useNavbar hanya boleh dipakai di dalam <NavbarProvider>.");
  }

  return ctx;
};
