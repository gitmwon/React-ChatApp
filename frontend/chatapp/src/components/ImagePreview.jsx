import React, { useRef,useState } from "react";
import imageData from "../components/sample/images.jpeg";
import { Plus, SendHorizontal, X } from "lucide-react";
import { useMessagestore } from "@/store/useMessagestore";

function ImagePreview() {
  const fileInputRef = useRef(null);
  const setPreviewImg = useMessagestore((state) => state.setPreviewImg);
  const currentUser = useMessagestore((state) => state.currentUser);
  const setShowPreview = useMessagestore((state) => state.setShowPreview);
  const previewImg = useMessagestore((state) => state.previewImg);
  const removePreview = useMessagestore((state) => state.removePreview);
  const Imgstack = useMessagestore((state) => state.Imgstack);
  const prevImages = useMessagestore((state) => state.prevImages);
  const currentPrev = useMessagestore((state)=> state.currentPrev);
  const sendMessage = useMessagestore((state) => state.sendMessage);
  // const [NewMessage,setNewMessage] = useState({
  //     id:"",
  //     text: "",
  //     images: [],
  //   });

  const handleClose = () => {
    setPreviewImg(null);
    setShowPreview(false);
    removePreview();
  };

  const addMoreImg = (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.type === "file") {
      if (!e.target.files || e.target.files.length == 0) {
        return;
      }
      const file = e.target.files[0];
      setPreviewImg(URL.createObjectURL(file),file);
      //setNewMessage((prev)=>({...prev,id:currentUser,images:[...prev.images,...Imgstack]}));
    }
  };

  const setPrev = (img)=>{
    currentPrev(img);
  }

  const sendImg = () =>{
    sendMessage({id:currentUser,images:Imgstack});
  }

  return (
    <div className="absolute flex flex-col justify-center items-center bg-gray-50 w-full h-full bottom-0 z-40">
      <div className="close absolute left-0 h-full p-4">
        <button className="mt-20" onClick={handleClose}>
          <X size={32} color="#3c3939" />
        </button>
      </div>
      <div className="hold flex flex-col items-center justify-between h-56 w-96">
        <img
          src={`${previewImg}`}
          alt=""
          srcset=""
          className="object-contain w-full h-full"
        />
      </div>
      <div className="footer absolute h-28 bottom-0 border border-t-2 flex items-center">
        <div className="plus w-full h-full flex items-center justify-center cursor-pointer">
          {/* <span className="h-14 w-14 flex justify-center items-center border border-slate-500 rounded-sm">
            <img src={`${imageData}`} alt="" srcset="" />
          </span> */}
          {prevImages.map((img, index) =>
            <button
              key={index}
              className="h-14 w-14 flex justify-center items-center border border-slate-500 rounded-sm"
              onClick={()=>{setPrev(img)}}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          )}

          <button
            className="h-14 w-14 flex justify-center items-center border border-slate-500 rounded-sm"
            onClick={addMoreImg}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="w-0 h-0 absolute"
              onChange={handleChange}
            />
            <Plus size={32} color="#272525" />
          </button>
        </div>
        <button className="absolute p-2 flex items-center justify-center right-0 rounded-full hover:bg-gray-100 mr-10"
         onClick={sendImg}>
          <SendHorizontal size={32} color="#2f2d2d" />
        </button>
      </div>
    </div>
  );
}

export default ImagePreview;
