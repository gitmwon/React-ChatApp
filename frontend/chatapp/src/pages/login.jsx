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

function login() {
  const {Bgtheme,componentsTheme,Textcolor,setTheme} = useThemestore();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login} = useAuthstore();

  const validateForm = () => {

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(validateForm());
    if(validateForm()){
      await login(formData);
      const {errormsg} = useAuthstore.getState();
      if(!errormsg){
        toast.success("login successfull");
      }else{
        toast.error("Invalid credentials");
      }
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
              <CardTitle>Login</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">

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
              {isLoggingIn == false ? (<Button type="submit">Login</Button>) : 
              (<span class="loading loading-dots loading-md"></span>)}
            </CardFooter>
          </form>
        </Card>
        <div className="flex p-2 justify-center">
          <p className={`${Textcolor ? Textcolor : "text-black"}`}>Create an Account ? </p> 
          <Link to="/SignUp" className="pl-2 hover:text-red-500">
          SignUp
          </Link>
        </div>
      </div>
      {/* <div className="sec2">Image...</div> */}
    </div>
    </>
  );
}

export default login