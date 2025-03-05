import React from "react";
import {
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import  AppIconbar  from "@/components/app-iconbar"

function Iconbar() {
  return (
    <SidebarProvider>
    <AppIconbar />
    <main>
    
    </main>
  </SidebarProvider>
  );
}

export default Iconbar;
