"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CopyPlus, Eye, CircleCheckBig } from "lucide-react";
import { ROUTES } from "@/config/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const MENU_ITEMS = [
  { label: "Form Request", href: ROUTES.request, icon: CopyPlus },
  { label: "Form Review", href: ROUTES.review, icon: Eye },
  { label: "Form Approve", href: ROUTES.approve, icon: CircleCheckBig },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 py-1.5">
          <span className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
            ..
          </span>
          <span className="text-xl font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            ...
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-">
              {MENU_ITEMS.map(({ label, href, icon: Icon }) => {
                const isActive = pathname?.startsWith(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      render={<Link href={href} />}
                      isActive={isActive}
                      tooltip={label}
                      className={
                        isActive
                          ? "!bg-primary !font-semibold !text-primary-foreground !rounded-sm !py-5 mt-2"
                          : "rounded-sm py-5 mt-2"
                      }
                    >
                      <Icon className="w-3 h-3" />
                      <span className="text-[14px]">{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
