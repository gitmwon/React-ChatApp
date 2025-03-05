import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMessagestore } from '@/store/useMessagestore';
import { 
  User, 
  Send, 
  Mic, 
  Image as ImageIcon, 
  MoreVertical, 
  Phone, 
  Video
} from 'lucide-react';
import profile from "../logo/profile.png";

const MessageContainer = () => {

  const messages = useMessagestore((state)=>state.messages);
  const userData = useMessagestore((state)=> state.userData);

  console.log(messages)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  // const handleImageUpload = () => {
  //   alert('Image upload functionality would be implemented here');
  // };

  const themeStyles = {
    //primary: themeColor,
    //primaryLight: `${themeColor}33`,
    //userBubble: themeColor,
    otherBubble: '#f3f4f6',
    userText: '#ffffff',
    otherText: '#1f2937',
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-143px)] w-full bg-white shadow-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message,i) => (

            <div className={`flex ${message.reciever === userData._id ? 'justify-end' : 'justify-start'}`} id={i}>
              <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 bg-stone-200">
                <p className="break-words">{message.text}</p>
                <p className="text-xs mt-1 text-right text-gray-500">{
                new Date(message.createdAt).toLocaleTimeString([],{
                  hour:"2-digit",
                  minute:"2-digit"
                })
                }</p>
              </div>
            </div>

          ))}
        </div>
      </div>

    </div>
  );
};

export default MessageContainer;
