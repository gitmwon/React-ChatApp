import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {io} from "socket.io-client";
import { useMessagestore } from "./useMessagestore";

export const useAuthstore = create((set, get) => ({
  isAuth: {},
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  errormsg: null,
  currentSidebarcomp:"contacts",
  socket:null,
  onlineUsers:[],
  setcomponent:(comp)=> set({currentSidebarcomp:comp}),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkuser");
      set({ isAuth: res.data });
      console.log(get().isAuth);
      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ isAuth: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      if (data) {
        set({ isSigningUp: true });
      }
      const res = await axiosInstance.post("/auth/signup", data);
      set((state) => ({
        isAuth: {
          ...state.isAuth, // Preserve existing user properties
          ...res.data.data, // Merge signup response data
        },
      }));
      get().connectSocket();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      if (data) {
        set({ isLoggingIn: true, errormsg: null });
      }
      const res = await axiosInstance.post("/auth/login", data);
      //console.log("profilepic:",res.data.profilePic);
      //console.log("data:",res.data);
      set((state)=>({
        isAuth:{
          ...state.isAuth, // Preserve existing user properties
          ...res.data.data,
        }
      }));
      get().connectSocket();
    } catch (error) {
      //console.log(error.response.data.message);
      set({ errormsg: error.response.data.message });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logoutUser: async (data) => {
    try {
      console.log("logging out")
      if (data == true) {
        const res = await axiosInstance.post("/auth/logout");
        set({ isAuth: null });
        get().checkAuth();
      }
    } catch (error) {
      console.log(error);
    }
  },

  connectSocket: async ()=>{
    try {
      let socket = get().socket
      if(get().isAuth && !socket){
        socket = io("http://localhost:8080", {
           withCredentials: true,
           autoConnect: false,
           query:{
            userID : get().isAuth._id
           }
        });
        socket.connect();

        socket.on("connection",(data)=>{
          set({socket})
        })

        socket.on("getOnlineUsers",(Onlinelist)=>{
          set((state)=>({onlineUsers : Onlinelist}));
        })

      }
    } catch (error) {
      console.log(error);
    }
  },

  updateProfile: async (data) => {
    try {
      //console.log("hello");
      if (data) {
        set({ isUpdatingProfile: true, isCheckingAuth: true });
        const formData = new FormData();
        formData.append("profilePic", data);
        const res = await axiosInstance.put("/auth/update-profile", formData);
        //console.log("API Response:", res.data.userPic.profilePic);
        if (res.data?.userPic?.profilePic) {
          //console.log("Before update:", get().isAuth.profilePic);
          set((state) => ({
            isAuth: {
              ...state.isAuth,
              profilePic: res.data.userPic.profilePic,
            },
          }));
          //console.log("After update:", get().isAuth.profilePic);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdatingProfile: false, isCheckingAuth: false });
    }
  },

  UpdateUserData: async (data) => {
    try {
      if (data) {
        //console.log(data);
        const res = await axiosInstance.put("/auth/update-data", data);
        //console.log(res.data.data.fullname);
          set((state) => ({
            isAuth: ({
              ...state.isAuth,
              fullname:res.data.data.fullname || state.isAuth.fullname,
              about:res.data.data.about || state.isAuth.about
            })
          }))
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
