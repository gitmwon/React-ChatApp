import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  AppSidebar  from "@/components/app-sidebar"

import React from 'react'

function Sidebar() {
  return (
    <SidebarProvider className="w-[400px]">
        <AppSidebar />
        <main>
      
        </main>
    </SidebarProvider>
  )
}

export default Sidebar