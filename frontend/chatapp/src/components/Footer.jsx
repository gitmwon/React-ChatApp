import React, {useRef, useState } from "react";
import { useMessagestore } from "@/store/useMessagestore";
import { 
  User, 
  Send, 
  Mic, 
  Image as ImageIcon, 
  MoreVertical, 
  Phone, 
  Video
} from 'lucide-react';

function Footer() {
  const fileInputRef = useRef(null);
  //const [imagePreview, setImagePreview] = useState([]);
  const [clearMessage,setclearMessage] = useState(false);
  const [NewMessage,setNewMessage] = useState({
    id:"",
    text: "",
    images: [],
  });

  const {sendMessage} = useMessagestore();
  const currentUser = useMessagestore((state) => state.currentUser);
  const setPreviewImg = useMessagestore((state) => state.setPreviewImg);
  const setShowPreview = useMessagestore((state)=> state.setShowPreview);

  const handleChange = (e) =>{
    e.preventDefault();
    setclearMessage(false);
    if(e.target.type === "file"){
      if(!e.target.files || e.target.files.length == 0){
            return;
          }
          setShowPreview(true);
          const fileList = Array.from(e.target.files)
          console.log(fileList[0]);
          console.log(URL.createObjectURL(fileList[0]))
          if(fileList.length > 0){
            setPreviewImg(URL.createObjectURL(fileList[0]),fileList[0]);
          }
    }else{
      setNewMessage((prev)=>({...prev,id:currentUser,text:e.target.value}));
    }
  }

  const HandleImage = (e) =>{
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  }

  // const handleImageUpload = (e)=>{
  //   if(!e.target.files){
  //     return;
  //   }
  //   const fileList = Array.from(e.target.files)
  //   console.log(fileList);
  //   if(fileList.length > 0){
  //     setImagePreview((prev)=>[...prev,fileList[0]]);
  //   }
  // }

  const handleSendMessage = () =>{
    if(NewMessage){
      setclearMessage(true);
      sendMessage(NewMessage);
    }
  }
  return (
    <>
      <div className="p-3 border-t bg-white bottom-0 min-h-[42px]"> 
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={HandleImage}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative"
          >
            <input type="file" ref={fileInputRef} className="w-0 h-0 absolute" onChange={handleChange}/>
            <ImageIcon size={20}/>
          </button>

          <textarea
            value={(clearMessage == false) ? NewMessage.text : ""}
            onChange={handleChange}
            placeholder="Type a message..."
            className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 resize-none max-h-20 min-h-[40px]"
            rows={1}
          />
          <button
            // onClick={handleVoiceRecord}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Mic size={20} />
          </button>
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Footer;
