import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import HeaderContent from "./HeaderContent";
import SidebarData from "./SidebarData";
import EditProfile from "./editProfile";
import { useAuthstore } from "@/store/useAuthstore";

function AppSidebar() {
  const currentSidebarcomp = useAuthstore((state) => state.currentSidebarcomp);
  const renderContent = () => {
    if (currentSidebarcomp == "contacts")
      return (
        <>
          <SidebarHeader className="bg-stone-300">
            <HeaderContent />
          </SidebarHeader>
          <SidebarContent className="bg-stone-300">
            <SidebarGroup />
            <SidebarData />
            <SidebarGroup />
          </SidebarContent>
        </>
      );

    if (currentSidebarcomp == "profile") return(<EditProfile />)

    if (currentSidebarcomp == "settings") return("settings")  
      
      return (
        <>
          <SidebarHeader className="bg-stone-300">
            <HeaderContent />
          </SidebarHeader>
          <SidebarContent className="bg-stone-300">
            <SidebarGroup />
            <SidebarData />
            <SidebarGroup />
          </SidebarContent>
        </>
      );  
  };

  return <Sidebar className="left-auto w-auto ">{renderContent()}</Sidebar>;
}

export default AppSidebar;
