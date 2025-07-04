"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  LayoutDashboard,
  Settings,
  UserCircle,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { ThemeToggle } from "./theme-toggle";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tools", label: "AI Tools", icon: Wrench },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/about", label: "About", icon: Info },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-8 text-primary" />
          <span className="font-headline text-lg font-semibold">
            AstroScope
          </span>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href} onClick={handleLinkClick}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex-row items-center border-t border-sidebar-border p-2">
        <div className="flex-1">
            <SidebarMenuButton tooltip="Profile">
              <UserCircle />
              <span>Guest User</span>
            </SidebarMenuButton>
        </div>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
