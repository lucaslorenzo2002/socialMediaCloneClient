import { useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import Chat from "./Chat";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import CONFIG from "../../constants/config";
import { useSelector } from "react-redux";

const Messages = ({ socket }) => {
  const token = useSelector((state) => state.token);

  const [isChatListVisible, setIsChatListVisible] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatName, setChatName] = useState("");
  const [chatUserName, setChatUserName] = useState("");
  const [chatProfilePhoto, setChatProfilePhoto] = useState("");

  useEffect(() => {
    console.log("getting chats");
    axios
      .get(
        `${CONFIG.BASE_URL}/mischats`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setChats(response.data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const openChat = (chat) => {
    setChatName(chat.full_name);
    setChatUserName(chat.username);
    setChatProfilePhoto(chat.profilePhoto);
  };

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
          className={`transition-all duration-300 border-r border-slate-200 transform ${
            isChatListVisible ? "w-full" : "w-0"
          } overflow-hidden md:w-64`}
        >
          <h3 className="ml-4 text-xl font-bold mt-3">Tus Chats</h3>
          {chats.length === 0 && <p className="px-5 mt-5 text-slate-400">No tienes chats disponibles</p>}
          {chats.map((chat, index) => (
            <div
              key={index}
              onClick={() => openChat(chat)}
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
            >
              <img
                src={chat.profilePhoto || "/defaultProfileImg.png"}
                alt={chat.full_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold">{chat.full_name}</div>
                <div className="text-sm text-gray-600">{chat.username}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat activo */}
        {!isChatListVisible && (
          <div className="flex-1">
            <Chat
              fullname={chatName}
              username={chatUserName}
              profile_photo={chatProfilePhoto}
              socket={socket}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
