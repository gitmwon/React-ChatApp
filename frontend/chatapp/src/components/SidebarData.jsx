import React, { useEffect, useState } from "react";
import { useMessagestore } from "@/store/useMessagestore";
import { Skeleton } from "@/components/ui/skeleton";
import profile from '../logo/profile.png';
import { useAuthstore } from "@/store/useAuthstore";

function SidebarData() {
  const { users, fetchingUsers, getSidebarUsers} = useMessagestore();
  const displayContact = useMessagestore((state) => state.displayContact);
  const [userData, setuserData] = useState([]);
  const onlineUsers = useAuthstore((state)=> state.onlineUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getSidebarUsers();
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  // const OnlineUsersAry = Object.values(onlineUsers);
    console.log("OnlineUsers:",onlineUsers);

  if (fetchingUsers) {
    return (
      <>
        {Array.from({ length: 20 }).map((_, i) => {
          return (
            <div
              className="profile-holder flex w-full h-16 hover:bg-stone-200 justify-center"
              key={i}
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  if (!users || users.length === 0) {
    return <div>No users available</div>;
  }

  return (
    <>
      {users.Allusers.map((user, i) => {
        return (
          <div
            className="profile-holder flex w-full h-16 hover:bg-stone-200"
            key={i}
          >
            <button className="flex items-center w-full" key={user._id} onClick={()=>{displayContact(user._id)}}>
              <div className="profile-img bg-white w-[60px] h-[50px] rounded-full flex justify-center items-center ml-3">
                <span className="block">
                  <img
                    src={user.profilePic == "" ? profile : user.profilePic}
                    alt=""
                    srcSet=""
                    className="rounded-full w-[45px] h-[45px] "
                  />
                </span>
              </div>
              <div className="sec1 flex flex-col ml-3 border-b-2 border-b-stone-200 w-full h-full justify-center">
                <div className="name text-left">{user.fullname}</div>
                <div className="last-msg text-left">
                  <div className={(onlineUsers.includes(user._id) == true)?"text-green-500 font-sans italic"
                    :"text-slate-500 font-sans italic"}>
                    {(onlineUsers.includes(user._id) == true)?"Online":"Offline"}
                    </div>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
}

export default SidebarData;
