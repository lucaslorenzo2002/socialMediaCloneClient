import React from "react";

const ChatMessage = ({
  text,
  profile_photo,
  user,
  isOwnMessage,
  createdAt,
  readed = false,
}) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

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
            <div className="text-xs">
              <span className="text-gray-500">{formatDate(createdAt)} </span>
              {readed ? (
                <span className="mx-1 !text-blue-500 font-bold tracking-[-0.3rem]">✓✓</span>
              ) : (
                <span className="mx-1 font-bold tracking-[-0.3rem]">✓</span>
              )}
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
            <div className="text-gray-500 text-xs">
              {formatDate(createdAt)}{" "}
              {readed && <span className="ml-2">✓</span>}
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
