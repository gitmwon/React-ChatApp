import React from "react";
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
  return (
    <>
      <div className="p-3 border-t bg-white bottom-0 min-h-[42px]"> 
        <div className="flex items-center justify-center space-x-2">
          <button
            // onClick={handleImageUpload}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ImageIcon size={20} />
          </button>
          <textarea
            value="hello"
            // onChange={(e) => setNewMessage(e.target.value)}
            // onKeyDown={handleKeyPress}
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
            // onClick={handleSendMessage}
            className="p-2 rounded-full hover:bg-gray-100"
            // style={{ backgroundColor: themeStyles.primary }}
            // disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Footer;
