import React, { useState,useEffect } from "react";
import chat from "../logo/chat.png";
import logout from "../logo/logout.png";
import { useThemestore } from "@/store/useThemestore";
import { useAuthstore } from "@/store/useAuthstore";

function NavBar() {

  const {Bgtheme,componentsTheme,Textcolor,setTheme,checked,setchecked} = useThemestore();
  const {logoutUser} = useAuthstore();
  //const [checked,setchecked] = useState(true);
  const [logoutVal,setlogoutVal] = useState(false);

  const handleChecked = () =>{
    checked == false ? setchecked(true) : setchecked(false);
    if(checked){
      setTheme(true);
    }else{
      setTheme(false);
    }
  }

  const logoutF= () =>{
    setlogoutVal(true);
    logoutUser(logoutVal);
  }

  return (
    <div className="navholder flex justify-center">
      {/* {console.log(Bgtheme)} */}
      <div className={`nav flex h-[45px] w-[calc(100vw-30px)] rounded-md mt-1 fixed ${componentsTheme ? componentsTheme 
        : "bg-gray-200"}`}>
        <div className="left flex items-center h-full">
          <div className="logo p-2">
            <img src={chat} alt="" srcSet="" className="w-[30px]" />
          </div>
          <div className={`name font-mono font-bold text-lg ${Textcolor ? Textcolor : "text-black"}`}>ChatKaro</div>
        </div>
        <div className="right flex items-center h-[full] ml-auto">

          <div className="form-control mr-10">
            <label className="label cursor-pointer">
            <span className={`label-text pr-2 ${Textcolor ? Textcolor : "text-black"}`}>{checked == false ? "Light" : "Dark"}</span>
              <input type="checkbox" className="toggle" checked={checked} onChange={handleChecked} />
            </label>
          </div>

          <button className="flex mr-5 bg-slate-500 rounded-md p-1" onClick={logoutF}>
            <div className="logo">
              <img src={logout} alt="" srcSet="" className="w-[25px]" />
            </div>
            <div className={`logout ${Textcolor ? Textcolor : "text-black"} pl-1`}>Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
