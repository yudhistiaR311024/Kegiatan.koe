"use client";

import { useNavbar } from "@/contexts/NavbarContext";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Minus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = [
  {
    label: "Dahboard",
    href: "/",
  },
  {
    label: "Forum",
    children: [
      { label: "Forum", href: "/forum" },
      { label: "Kategori", href: "/category" },
    ],
  },
  {
    label: "Setting",
    href: "/setting",
  },
];

const SideBar = () => {
  const { isOpen, toggle } = useNavbar();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const asideRef = useRef<HTMLElement | null>(null);
  const path = usePathname();

  const toggleOpen = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <aside
          ref={asideRef}
          className="h-dvh pt-16 py-2 min-w-64 border-r border-gray-200 px-2 flex flex-col justify-between"
        >
          <div className="mt-2 md:mt-4 w-full">
            {NavMenu.map((item, i) => {
              const isOpenMenu = openIndex === i;
              const isActive = path === item.href;

              if (!item.children) {
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={`${
                      isActive ? "bg-blue-400 text-white" : ""
                    } transition-colors duration-300 ease-in-out block w-full text-start hover:bg-gray-100 hover:text-inherit py-2 px-4 rounded-md`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={i}>
                  <button
                    onClick={() => toggleOpen(i)}
                    className="w-full text-start hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer"
                  >
                    <span
                      className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
                        isOpenMenu && isActive ? "text-blue-400" : ""
                      }`}
                    >
                      {item.label}
                      {isOpenMenu ? <ChevronDown /> : <Minus />}
                    </span>
                  </button>

                  {isOpenMenu ? (
                    <ul>
                      {item.children.map((child, j) => {
                        const isChildActive = path === child.href;

                        return (
                          <Link
                            className={`${
                              isChildActive ? "bg-blue-400" : ""
                            } block transition-all duration-300 ease-in-out px-8 py-2 hover:bg-gray-100 hover:underline rounded-md`}
                            href={child.href}
                            key={j}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>

          <Link
            href="/forum"
            className="block w-full text-start hover:bg-gray-100 py-2 px-4 rounded-md"
          >
            Memberikan Saran dan Laporan Bug
          </Link>
        </aside>
      ) : null}
    </>
  );
};

export default SideBar;
