import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMessagestore = create((set, get) => ({
  users: null,
  currentUser: null,
  fetchingUsers: true,
  fetchingUserData: true,
  fetchingMessages: true,
  previewImg: null,
  prevImages: [],
  Imgstack: [],
  showPreview: false,
  messages: [],
  userData: {},
  imageOrientations: {},
  getSidebarUsers: async () => {
    try {
      const usersData = await axiosInstance.get(
        "http://localhost:8080/api/messages/users"
      );
      set({ fetchingUsers: true });
      if (usersData.data) {
        set({ users: usersData.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ fetchingUsers: false });
    }
  },

  setShowPreview: async (val) => {
    set({ showPreview: val });
  },

  currentPrev: async (val) => {
    set({ previewImg: val });
  },

  removePreview: async () => {
    try {
      set({ Imgstack: [] });
    } catch (error) {
      console.log(error);
    }
  },

  setPreviewImg: async (imageData, fileData) => {
    try {
      //console.log(imageData);
      set({ previewImg: imageData });
      set((state) => ({ prevImages: [...state.prevImages, imageData] }));
      set((state) => ({ Imgstack: [...state.Imgstack, fileData] }));
      console.log(get().Imgstack);
    } catch (error) {
      console.log(error);
    }
  },

  sendMessage: async ({ id, text, images }) => {
    try {
      const formData = new FormData();
      if (text) {
        formData.append("text", text);
      }
      if (images.length > 0) {
        images.forEach((img, i) => {
          formData.append("image", img);
          get().setimageOrientation();
          set({
            showPreview: false,
            previewImg: null,
            Imgstack: [],
          });
        });
      }
      const res = await axiosInstance.post(
        `http://localhost:8080/api/messages/send/${id}`,
        formData
      );
      if (res) {
        console.log("message send success");
      }
    } catch (error) {
      console.log(error);
    }
  },

  displayContact: async (id) => {
    try {
      const res = await axiosInstance.get(
        `http://localhost:8080/api/messages/${id}`
      );
      const { messages, userData } = res.data;
      set({ fetchingUserData: true });
      set({ fetchingMessages: true });
      set((state) => ({ ...state.currentUser, currentUser: id }));
      set((state) => ({ ...state, messages, userData }));
      get().setimageOrientation();
    } catch (error) {
      console.log(error);
    } finally {
      set({ fetchingUserData: false });
      set({ fetchingMessages: false });
    }
  },

  setimageOrientation: () => {
    try {
      get().messages.forEach((message) => {
        if (message.image) {
            console.log(message.image);
          message.image.forEach((img, i) => {
            const imgElement = new Image();
            imgElement.src = img;

            imgElement.onload = () => {
              const isPortrait = imgElement.height > imgElement.width;

              set((state)=>({...state,imageOrientations:{
                ...state.imageOrientations,
                [`${img}`]: isPortrait ? "portrait w-[200px]" : "landscape w-[350px]",
              }
            })); // Update Zustand store
            };
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
