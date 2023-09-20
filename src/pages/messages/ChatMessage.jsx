import React from "react";

const ChatMessage = ({ text, profile_photo = 'defaultProfileImg.png', user, isOwnMessage }) => {
  if (isOwnMessage) {
    return (
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                {text}
              </span>
            </div>
          </div>
          <img
            src={profile_photo}
            alt="My profile"
            className="w-8 h-8 rounded-full order-2"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                {text}
              </span>
            </div>
          </div>
          <img
            src={profile_photo}
            alt={user}
            className="w-8 h-8 rounded-full order-1"
          />
        </div>
      </div>
    );
  }
};

export default ChatMessage;
