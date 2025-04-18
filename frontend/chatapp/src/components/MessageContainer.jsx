import React, { useState } from "react";
import { useEffect } from "react";
import { useMessagestore } from "@/store/useMessagestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  User,
  Send,
  Mic,
  Image as ImageIcon,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import profile from "../logo/profile.png";

const MessageContainer = () => {
  const messages = useMessagestore((state) => state.messages);
  const initializeSocketListener = useMessagestore((state) => state.initializeSocketListener);

  const listenForSocketConnection = useMessagestore((state) => state.listenForSocketConnection);

  const userData = useMessagestore((state) => state.userData);
  const imageOrientations = useMessagestore((state) => state.imageOrientations);
  const setimageOrientation = useMessagestore(
    (state) => state.setimageOrientation
  );
  const fetchingMessages = useMessagestore((state) => state.fetchingMessages);
  //console.log("imageOrientation:", imageOrientations);

  useEffect(() => {
    console.log("fetching:", fetchingMessages);
    initializeSocketListener();
    // console.log(messages)
    // console.log(userData)
  }, [fetchingMessages,initializeSocketListener]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  const themeStyles = {
    //primary: themeColor,
    //primaryLight: `${themeColor}33`,
    //userBubble: themeColor,
    otherBubble: "#f3f4f6",
    userText: "#ffffff",
    otherText: "#1f2937",
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-143px)] w-full bg-white shadow-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, i) => {
            return message.text ? (
              <div>
                <div
                  className={`flex ${
                    message.reciever === userData._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  id={i}
                >
                  <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 bg-stone-200 ">
                    {fetchingMessages ? (
                      <Skeleton
                        enableAnimation={true}
                        direction={"ltr"}
                        height={25}
                        width={100}
                      />
                    ) : (
                      <>
                        <p className="break-words">{message.text}</p>
                        <p className="text-xs mt-1 text-right text-gray-500">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              message.image &&
                message.image.map((img, i) => {
                  const orientation =
                    imageOrientations[`${img}`] || "landscape w-[350px]";
                  //console.log("orientation:", orientation);
                  return (
                    <div>
                      <div
                        className={`flex ${
                          message.reciever === userData._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        id={i}
                      >
                        <div className="relative max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-1 py-1 bg-stone-200">
                          {fetchingMessages ? (
                            <Skeleton
                              enableAnimation={true}
                              direction={"ltr"}
                              height={150}
                              width={250}
                            />
                          ) : (
                            <>
                              <div>
                                <img
                                  src={img}
                                  alt=""
                                  srcset=""
                                  className={orientation}
                                />
                              </div>
                              <p className="text-xs mt-0 mr-3 bottom-2 text-right text-white absolute right-0">
                                {new Date(message.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
