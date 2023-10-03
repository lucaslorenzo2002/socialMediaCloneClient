import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useState } from "react";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSelector } from "react-redux";

const Chat = ({
  socket,
  username,
  fullname,
  profile_photo = "/defaultProfileImg.png",
}) => {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const user = useSelector((state) => state.user);

  const sendMessage = () => {
    // Manda mensaje al server
    const userId = 7;
    console.log(userId);
    const chatId = 1;
    socket.emit("send message", message, userId, chatId);
    console.log("enviado");

    // Agrega mensaje a la lista
    const sentMessage = {
      text: message,
      isOwnMessage: true,
    };
    setMessagesList((prevMessages) => [...prevMessages, sentMessage]);

    // Clear input
    setMessage("");
  };

  useEffect(() => {
    console.log("getting messages");
    socket.on("get messages", (messages) => {
      console.log(messages);
    });

    return () => {
      socket.off("get messages");
    };
  }, []);

  useEffect(() => {
    // Suscribe a get new message
    socket.on("get new message", (msg) => {
      console.log(msg[msg.length-1]);
     const lastMessage = msg[msg.length-1];
      // Agrega mensaje recibido a la lista
      const newMessage = {
        text: lastMessage.message,
        isOwnMessage: lastMessage.user_id === user.id,
      }
      console.log(newMessage.isOwnMessage);
      setMessagesList((prevMessages) => [...prevMessages, newMessage]);
    });

    // Se desuscribe cuando se desmonta el componente
    return () => {
      socket.off("get new message");
    };
  }, []);

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-2 mx-auto md:mx-0">
          <div className="relative scale-75">
            <span className="absolute text-green-500 right-0 bottom-0">
              <svg width={20} height={20}>
                <circle cx={8} cy={8} r={8} fill="currentColor" />
              </svg>
            </span>
            <img
              src={profile_photo}
              alt={username}
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{fullname}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messagesList.map((message, index) => (
          <ChatMessage
            key={index}
            isOwnMessage={message.isOwnMessage}
            text={message.text}
            profile_photo={profile_photo}
            user={username}
          />
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-md py-3"
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              onClick={sendMessage}
            >
              <span className="font-bold">Send</span>
              <SendRoundedIcon className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
