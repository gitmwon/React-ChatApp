import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useMessagestore = create((set)=>({
    users:null,
    fetchingUsers:true,
    fetchingUserData:true,
    fetchingMessages:true,
    messages:[],
    userData:{},
    getSidebarUsers: async ()=>{
        try {
            const usersData = await axiosInstance.get("http://localhost:8080/api/messages/users");
            set({fetchingUsers:true});
            if(usersData.data){
                set({users:usersData.data});
            }
        } catch (error) {
            console.log(error);
        }finally{
            set({fetchingUsers:false})
        }
    },

    displayContact: async (id)=>{
        try {
            const res = await axiosInstance.get(`http://localhost:8080/api/messages/${id}`);
            const {messages,userData} = res.data;
            set({ fetchingUserData:true});
            set({fetchingMessages:true});
            set((state)=>({...state,messages,userData}));
        } catch (error) {
            console.log(error);
        }finally{
            set({ fetchingUserData:false});
            set({fetchingMessages:false});
        }
    }
}))