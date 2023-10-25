import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../redux/tokenSlice";
import { toast } from "react-hot-toast";
import { removeUser } from "../../redux/userSlice";
import { resetNotifications } from "../../redux/notificationsSlice";

const SidebarLeft = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeToken());
    dispatch(removeUser());
    dispatch(resetNotifications());
    toast.success("Sesión cerrada correctamente.");
  };

  const user = useSelector((state) => state.user);

  return (
    <div>
      {/* Perfil de usuario */}
      <Link
        to={`/profile/${user.id}`}
        className="flex items-center p-4 space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg"
      >
        <img
          src={
            user.profile_photo ? user.profile_photo : "/defaultProfileImg.png"
          }
          alt="Profile Pic"
          width={"40px"}
          className="rounded-full aspect-square w-12 object-cover"
        />
        <div>
          <div className="font-bold">{user.full_name}</div>
          <div className="text-gray-500">{user.username}</div>
        </div>
      </Link>
      {/* Otras opciones de navegación */}
      <div className="p-4 space-y-2 flex flex-col">
        <Link
          to="/explore"
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          Explorar
        </Link>
        <Link
          to="/saved"
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          Guardados
        </Link>
        <Link
          to="/settings"
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          Configuración
        </Link>
        <Link
          to="/login"
          onClick={handleLogout}
          className="cursor-pointer text-red-500 hover:text-red-800 w-fit p-2 rounded-lg"
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default SidebarLeft;
