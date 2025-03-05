import React from "react";
import { useThemestore } from "@/store/useThemestore";
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

function profile() {
  const navigate = useNavigate();
  const { Bgtheme, componentsTheme, Textcolor, setTheme } = useThemestore();
  const { updateProfile, isUpdatingProfile,isCheckingAuth} = useAuthstore();
  const [imagePreview, setImagePreview] = useState(null);
  const [Img, setImg] = useState(null);

  console.log(isUpdatingProfile);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setImagePreview(URL.createObjectURL(file));
      setImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Img) {
      await updateProfile(Img);
      navigate("/");
    }
  };

  return (
    <div
      className={`holder w-screen h-screen flex justify-center items-center ${Bgtheme}`}
    >
      <Card className={`w-[350px] ${componentsTheme} border-none relative`}>
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex justify-center items-center">
            <CardTitle className={`${Textcolor}`}>Set Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="inputHolde flex flex-col items-center justify-center">
              <div
                className="holder bg-slate-400 w-[120px] h-[120px] rounded-full flex items-center 
            justify-center overflow-hidden"
              >
                <div className="logo flex justify-center items-center w-full h-full absolute">
                  <img
                    src={imagePreview == null ? profileImage : imagePreview}
                    alt=""
                    srcSet=""
                    className="object-fit rounded-full w-[100px] h-[100px]"
                  />
                </div>
                <input
                  type="file"
                  name=""
                  id=""
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  className="w-full h-full opacity-0"
                  onChange={handleImageChange}
                />
              </div>
              <div className={`textHolder p-3 ${Textcolor}`}>
                Click here to upload profile
              </div>
            </div>
          </CardContent>
          <div className="name flex flex-col justify-center items-center w-full h-full p-3">
            <div className={`p-2 w-full flex justify-between ${Textcolor}`}>
              <p>Username:</p> <p>Rahan Judes</p>
            </div>
            <div className={`p-2 w-full flex justify-between ${Textcolor}`}>
              <p>Account since:</p> <p>2025</p>
            </div>
          </div>
          <CardFooter>
            {isUpdatingProfile == false ? (
              <Button type="submit">{Img != null ? "Upload" : "Skip"}</Button>
            ) : (
              <span class="loading loading-dots loading-md"></span>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default profile;
