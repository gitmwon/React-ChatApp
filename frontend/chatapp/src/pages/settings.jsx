import React, { useEffect } from "react";
import { useState } from "react";
import profileImage from "../logo/profile.png";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthstore } from "@/store/useAuthstore";
import { Navigate } from "react-router-dom";

function settings() {
  const {logoutUser} = useAuthstore();

  const handlelogout = (e)=>{
    e.preventDefault();
    logoutUser(true);
  }
  
  return (
    <div
      className={`holder w-96 h-full flex justify-center items-center bg-stone-300 border-none`}
    >
      <Card
        className={`w-full h-full bg-stone-300 border-none relative rounded-none`}
      >
        <form>
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="w-full">
              <div className="title font-bold text-xl">Settings</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="inputHolde flex flex-col items-center justify-center">
              <Button type="button" onClick={handlelogout}>Logout</Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

export default settings;
