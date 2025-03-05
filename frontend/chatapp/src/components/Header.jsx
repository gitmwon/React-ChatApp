import React, { useEffect } from "react";

import { useState } from "react";
import MessageContainer from "./MessageContainer";
import profile from "../logo/profile.png";
import { useMessagestore } from "@/store/useMessagestore";
import { Settings,User, 
  Send, 
  Mic, 
  Image as ImageIcon, 
  MoreVertical, 
  Phone, 
  Video } from "lucide-react";

function Header() {
  const [themeColor, setThemeColor] = useState("#4F46E5"); // Default indigo color
  const [showSettings, setShowSettings] = useState(false);
  const messages = useMessagestore((state)=>state.messages);
  const userData = useMessagestore((state)=> state.userData);

  const predefinedColors = [
    "#4F46E5", // Indigo
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#06B6D4", // Cyan
    "#6366F1", // Indigo
  ];

  const [selectedUser, setselectedUser] = useState({
    id: 1,
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "online",
  });

  return (
    <div className="h-fit bg-gray-100 flex justify-center p-0">
      <div className="w-full max-w-4xl relative">

        <div className="flex items-center justify-between p-4 border-b bg-stone-200">
          {/* {border border-red-500} */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              {selectedUser.avatar ? (
                <img
                  src={(userData.profilePic) ? userData.profilePic : profile}
                  alt="image"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white">
                  <User size={20} />
                </div>
              )}
              {selectedUser.status && (
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    selectedUser.status === "online"
                      ? "bg-green-500"
                      : selectedUser.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{userData.fullname}</h3>
              <p className="text-xs text-gray-500 capitalize">online</p>
              {/* {selectedUser.status && (
                
               )} */}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Phone size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Video size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        <button
          //onClick={() => setShowSettings(!showSettings)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          title="Change Theme Color"
        >
          <Settings size={20} className="text-gray-600" />
        </button>

        {showSettings && (
          <div className="absolute top-16 right-4 z-10 bg-white p-4 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Choose Theme Color
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  //onClick={() => setThemeColor(color)}
                  className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: color,
                    boxShadow:
                      themeColor === color
                        ? "0 0 0 2px rgba(0,0,0,0.2)"
                        : "none",
                  }}
                />
              ))}
            </div>
            <div className="mt-3">
              <label className="text-xs text-gray-600 block mb-1">
                Custom Color
              </label>
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full h-8 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
