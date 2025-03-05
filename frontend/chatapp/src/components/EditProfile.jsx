import React, { useEffect } from "react";
import { useThemestore } from "@/store/useThemestore";
import { useState } from "react";
import profileImage from "../logo/profile.png";
import { useNavigate } from "react-router-dom";
import { Pencil, Check } from "lucide-react";
import { useRef } from "react";
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

function EditProfile() {
  const [fullnameData, setfullnameData] = useState("fetching...");
  const [aboutData, setaboutData] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditingName, setisEditingName] = useState(false);
  const [isEditingAbout, setisEditingAbout] = useState(false);
  const { Bgtheme, componentsTheme, Textcolor, setTheme } = useThemestore();
  const { updateProfile, isUpdatingProfile, isCheckingAuth, UpdateUserData } =
    useAuthstore();
  const profilePic = useAuthstore((state) => state.isAuth.profilePic);
  const fullname = useAuthstore((state) => state.isAuth.fullname);
  const about = useAuthstore((state) => state.isAuth.about);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        console.log(file);
        setImagePreview(URL.createObjectURL(file));
        await updateProfile(file);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await UpdateUserData({ fullname: fullnameData, about: aboutData });
      setisEditingName(false);
      setisEditingAbout(false)
    } catch (error) {
      console.log(error);
    }
  };

  const updateEditName = (e) => {
    e.preventDefault();
    setisEditingName(true);
  }

  const updateEditAbout = (e) => {
    e.preventDefault();
    setisEditingAbout(true);
  }

  useEffect(() => {
    setfullnameData(fullname);
    setaboutData(about);
    console.log("triggered");
  }, [fullname]);

  useEffect(() => {
    if (profilePic) {
      setImagePreview(profilePic);
      console.log("Profile image set");
    }
  }, [profilePic]);

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
              <div className="title font-bold text-xl">Profile</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="inputHolde flex flex-col items-center justify-center">
              <div
                className="holder bg-slate-400 w-[180px] h-[180px] rounded-full flex items-center 
            justify-center overflow-hidden flex-col"
              >
                <div className="logo flex justify-center items-center w-full h-full relative">
                  <img
                    src={imagePreview == null ? profileImage : imagePreview}
                    alt=""
                    srcSet=""
                    className={
                      imagePreview == null
                        ? "object-fit w-[100px] h-[100px]"
                        : "object-fit w-full h-full"
                    }
                  />
                  <input
                    type="file"
                    name=""
                    id=""
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    className="w-full h-full opacity-0 absolute"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className={`textHolder p-3 ${Textcolor}`}>
                Click here to upload profile
              </div>
            </div>
          </CardContent>
          <div className="name flex flex-col justify-center items-center w-full h-full p-3">
            <div
              className={`p-2 w-full flex flex-col justify-between ${Textcolor}`}
            >
              <div>Your name</div>
              <div className="mt-3">
                <div className={`input-holder relative ${isEditingName ? "border-b-2 border-green-400" : ""} flex justify-end`}>
                  <input
                    type="text"
                    value={
                      fullnameData == undefined ? "fetching..." : fullnameData
                    }
                    readOnly={!isEditingName}
                    onChange={(e) => {
                      setfullnameData(e.target.value);
                    }}
                    className="w-full bg-transparent focus:outline-none"
                  />
                  {isEditingName ? (
                    <button className="absolute" onClick={(e) => updateData(e)}>
                      <Check size={20} />
                    </button>
                  ) : (
                    <button className="absolute" onClick={(e) => updateEditName(e)}>
                      <Pencil size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`p-2 w-full flex flex-col justify-between ${Textcolor}`}
            >
              <div>About</div>
              <div className="mt-3">
                <div className={`input-holder relative ${isEditingAbout ? "border-b-2 border-green-400" : ""} flex justify-end`}>
                  <input
                    type="text"
                    value={
                      aboutData == undefined ? "fetching..." : aboutData
                    }
                    readOnly={!isEditingAbout}
                    onChange={(e) => {
                      setaboutData(e.target.value);
                    }}
                    className="w-full bg-transparent focus:outline-none"
                  />
                  {isEditingAbout ? (
                    <button className="absolute" onClick={(e) => updateData(e)}>
                      <Check size={20} />
                    </button>
                  ) : (
                    <button className="absolute" onClick={(e) => updateEditAbout(e)}>
                      <Pencil size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EditProfile;
