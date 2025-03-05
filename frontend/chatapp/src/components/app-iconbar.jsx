import React, { useEffect, useState } from "react";
import { MessagesSquare, Settings } from "lucide-react";
import { useAuthstore } from "@/store/useAuthstore";
import { Skeleton } from "@/components/ui/skeleton";
import profile from "../logo/profile.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "",
    url: "#",
    icon: MessagesSquare,
  },
  {
    title: "",
    url: "#",
    icon: Settings,
  },
];

function AppIconbar() {
  const profilePic = useAuthstore((state) => state.isAuth.profilePic); 
  const isCheckingAuth = useAuthstore((state) => state.isCheckingAuth);
  const setcomponent = useAuthstore((state) => state.setcomponent);

  //console.log("Rendering AppIconbar, profilePic:", profilePic);

  if (isCheckingAuth) {
    return (
      <div>
        {Array.from({ length: 2 }).map((_, i) => {
          return (
            <div
              className="flex flex-col profile-holder w-[80px] h-16 hover:bg-stone-200 justify-center items-center"
              key={i}
            >
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col items-center justify-between mb-2 bg-stone-200 ">
        <SidebarGroup className="list-none">
          <SidebarMenuItem className="flex flex-col items-center">
            <div>
               <button
                  className="flex justify-center items-center rounded-full w-[45px] h-[45px] 
                 mt-2 hover:bg-slate-100"
                 onClick={()=> setcomponent("contacts")}
                >
                  <MessagesSquare size={28} absoluteStrokeWidth />
                </button>

                <button
                  className="flex justify-center items-center rounded-full w-[45px] h-[45px] 
                 mt-2 hover:bg-slate-100"
                 onClick={()=> setcomponent("settings")}
                >
                  <Settings size={28} absoluteStrokeWidth />
                </button>
            </div>
          </SidebarMenuItem>
        </SidebarGroup>
        <button
          className="flex justify-center items-center rounded-full w-[45px] h-[50px] 
          mt-2 hover:bg-slate-100"
          onClick={()=> setcomponent("profile")}
        >
          <div>
            {profilePic ? (
              <div>
                <img
                  src={profilePic}
                  alt=""
                  className="rounded-full w-[45px] h-[45px]"
                />
              </div>
            ) : (
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            )}
          </div>
        </button>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppIconbar;
