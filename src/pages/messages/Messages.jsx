import { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import Chat from "./Chat";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Messages = () => {
  const [isChatListVisible, setIsChatListVisible] = useState(false);

  const chats = [
    {
      profilePhoto: "/defaultProfileImg.png",
      fullName: "Usuario Uno",
      username: "@usuario1",
    },
    {
      profilePhoto: "/defaultProfileImg.png",
      fullName: "Usuario Dos",
      username: "@usuario2",
    },
    {
      profilePhoto: "/defaultProfileImg.png",
      fullName: "Usuario Tres",
      username: "@usuario3",
    },
    // ... más chats aquí
  ];
  return (
    <>
      <NavBar />
      <div className={`mt-16 px-5 flex relative`}>
        {/* Botón para mostrar/ocultar lista de chats en dispositivos móviles */}
        <button
          className={`md:hidden py-2 px-2 focus:outline-none rounded-full bg-white shadow-lg absolute top-0 ${
            isChatListVisible ? "right-4" : "left-4"
          } z-10 transition-all duration-300`}
          onClick={() => setIsChatListVisible(!isChatListVisible)}
        >
          {isChatListVisible ? (
            <ArrowBackIosNewIcon className="max-w-[12px] max-h-[12px]" />
          ) : (
            <ArrowForwardIosIcon className="max-w-[12px] max-h-[12px]" />
          )}
        </button>

        {/* Lista de chats */}
        <div
          className={`transition-all duration-300 transform ${
            isChatListVisible ? "w-full" : "w-0"
          } overflow-hidden md:w-64`}
        >
          <h3 className="ml-4 text-xl font-bold mt-3">Tus Chats</h3>
          {chats.map((chat, index) => (
            <div
              key={index}
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
            >
              <img
                src={chat.profilePhoto}
                alt={chat.fullName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold">{chat.fullName}</div>
                <div className="text-sm text-gray-600">{chat.username}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat activo */}
        {!isChatListVisible && (
          <div className="flex-1">
            <Chat fullname={"Usuario 1"} />
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
