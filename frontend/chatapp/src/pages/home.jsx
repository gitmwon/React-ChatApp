import React from "react";
import Iconbar from "../components/Iconbar";
import Sidebar from "@/components/Sidebar";
import ContentSec from "@/components/ContentSec";


const HomePage = () => {
  return (
    <>
      <div className="main flex">
        <div className="Msidebar">
          <Iconbar />
        </div>
        <div className="profileHolder">
          <Sidebar />
        </div>
        <div className="contentSec w-full h-[100dvh] relative overflow-hidden"> 
          <ContentSec/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
