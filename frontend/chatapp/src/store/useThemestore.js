import {create} from "zustand";

export const useThemestore = create ((set)=>({
    Bgtheme:"",
    componentsTheme:"",
    Textcolor:"",
    checked:false,

    setchecked: async (flag)=>{
        try {
            set({checked:flag})
        } catch (error) {
            console.log(error)
        }
    },

    setTheme : async (val)=>{
        try {
            if(!val){
                set({Bgtheme:"bg-gray-800"})
                set({componentsTheme:"bg-gray-700"})
                set({Textcolor:"text-white"})
            }else{
                set({Bgtheme:"bg-white"})
                set({componentsTheme:"bg-gray-200"})
                set({Textcolor:"text-black"})
            }
        } catch (error) {
            console.log(error)
        }
        
    }

}))