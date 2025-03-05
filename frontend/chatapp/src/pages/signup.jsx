import React from "react";
import { useState } from "react";
import { useAuthstore } from "../store/useAuthstore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useThemestore } from "@/store/useThemestore";
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function signup() {
  const {Bgtheme,componentsTheme,Textcolor,setTheme} = useThemestore();
  const [formData, setformData] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  const { isSigningUp, signup } = useAuthstore();

  const validateForm = () => {

    if (!formData.fullname.trim()) 
      {
        toast.error("provide name");
        return false
      } 
    if (!formData.email.trim()){ 
      toast.error("provide email")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)){ 
      toast.error("provide valid email")
      return false;
    }
    if (!formData.password){
      toast.error("provide password");
      return false;
    } 
    if (formData.password.length < 6){ 
      toast.error("password length cannot exceed 6")
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(validateForm());
    if(validateForm()){
      toast.success("Account created");
      signup(formData);
    }else{
      console.log("error");
    }
  };

  return (
    <>
    <NavBar/>
    <div className={`holder w-screen h-screen flex justify-center items-center ${Bgtheme?Bgtheme:"bg-white"}`}>
      <div className="sec1">
        <Card className={`w-[350px] ${componentsTheme ? componentsTheme : "bg-gray-200"} border-none`}>
          <form onSubmit={handleSubmit} className={`${Textcolor ? Textcolor : "text-black"}`}>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="bg-white"
                  value={formData.fullname}
                  onChange={(e) => {
                    setformData({ ...formData, fullname: e.target.value });
                  }}
                />

                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="bg-white"
                  value={formData.email}
                  onChange={(e) => {
                    setformData({ ...formData, email: e.target.value });
                  }}
                />

                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="bg-white"
                  value={formData.password}
                  onChange={(e) => {
                    setformData({ ...formData, password: e.target.value });
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              {isSigningUp == false ? (<Button type="submit">Next</Button>) : 
              (<span class="loading loading-dots loading-md"></span>)}
            </CardFooter>
          </form>
        </Card>
        <div className="flex p-2 justify-center">
          <p className={`${Textcolor ? Textcolor : "text-black"}`}>Aldready have an account ?</p> 
          <Link to="/login" className="pl-2 hover:text-red-500">
          login
          </Link>
        </div>
      </div>
      {/* <div className="sec2">Image...</div> */}
    </div>
    </>
  );
}

export default signup;
