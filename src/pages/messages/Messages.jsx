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
  const connectedUsers = useSelector((state) => state.connectedUsers);

  const [isChatListVisible, setIsChatListVisible] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    axios
      .get(`${CONFIG.BASE_URL}/mischats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        const newChatList = data.map((chat) => ({
          ...chat,
          lastMessage: {
            message: "test",
            readed: false,
          },
        }));
        setChats(newChatList);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const openChat = (chat) => {
    socket.emit("get user id", chat.id);

    setSelectedChat(chat);
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
          className={`transition-all duration-300 border-r border-slate-200 h-full transform ${
            isChatListVisible ? "w-full" : "w-0"
          } overflow-hidden md:w-64`}
        >
          <h3 className="ml-4 text-xl font-bold mt-3">Tus Chats</h3>
          {chats.length === 0 && (
            <p className="px-5 mt-5 text-slate-400">
              No tienes chats disponibles
            </p>
          )}
          {chats.map((chat, index) => (
            <div
              key={index}
              onClick={() => {
                setIsChatListVisible(false);
                openChat(chat);
              }}
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
            >
              <img
                src={chat.profile_photo || "/defaultProfileImg.png"}
                alt={chat.full_name}
                onError={(e) => {
                  console.log(e);
                  e.target.src = "/defaultProfileImg.png";
                }}
                className="w-10 aspect-square object-cover rounded-full mr-3"
              />

              <div className="w-full overflow-hidden">
                <div className="font-semibold">{chat.full_name}</div>
                <div className="flex justify-between">
                  <div className="text-xs text-gray-600">{chat.username}</div>
                  <p
                    className={`text-xs ${
                      connectedUsers.some((user) => user.userId === chat.id)
                        ? "text-green-500 font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {connectedUsers.some((user) => user.userId === chat.id)
                      ? "online"
                      : "offline"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!selectedChat && <div className="flex-1 text-slate-400 grid place-items-center ">Selecciona un chat</div>}

        {/* Chat activo */}
        {!isChatListVisible && selectedChat && (
          <div className="flex-1">
            <Chat
              chatId={selectedChat.chat_id}
              user_id={selectedChat.id}
              fullname={selectedChat.full_name}
              username={selectedChat.username}
              profile_photo={selectedChat.profile_photo}
              socket={socket}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
