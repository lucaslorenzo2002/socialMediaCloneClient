import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import axios from "axios";
import {
  fetchStart,
  fetchSuccess,
  fetchError,
} from "../../redux/notificationsSlice";

import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation } from "react-router-dom";
import CONFIG from "../../constants/config";
import { Mention, MentionsInput } from "react-mentions";

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMessagePage, setIsMessagePage] = useState(false);

  useEffect(() => {
    if (location.pathname === "/messages") {
      setIsMessagePage(true);
    } else {
      setIsMessagePage(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const { notifications: reduxNotifications, loading } = useSelector(
    (state) => state.notifications
  );

  const user = useSelector((state) => state.user);

  /*  useEffect(() => {
    // Si no hay notificaciones y no están en proceso de cargarse, entonces las busca
    if (reduxNotifications.length === 0 && !loading) {
      dispatch(fetchStart()); // Indica que empezará la petición

      axios
        .get(`${CONFIG.BASE_URL}/notificaciones`)
        .then((response) => {
          dispatch(fetchSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchError("Error fetching notifications"));
        });
    }
  }, [reduxNotifications, loading, dispatch]); */
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);

  const unreaded = reduxNotifications.filter((item) => !item.readed).length;

  const [inputValue, setInputValue] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const users = response.data.data.map((user) => ({
        id: user.id,
        display: user.username.slice(1),
      }));

      setUsers(users);
      console.log(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (inputValue.startsWith("@")) {
      const username = inputValue.slice(1);
      window.location.href = `/profile/${username}`;
    }

    setInputValue("");
  };

  return (
    <header className="w-full bg-white py-4 px-8 border-b border-gray-200 fixed w-full: top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center w-full">
          {/* Left: Icons */}
          <div
            className={`${
              isDesktopOrLaptop ? "flex" : "hidden"
            } space-x-6 lg:w-1/3 md:w-auto w-full`}
          >
            <Link to="/">
              <HomeIcon className="cursor-pointer hover:text-blue-500" />
            </Link>
            <Link to="/notifications" className="relative">
              <NotificationsIcon className="cursor-pointer hover:text-blue-500" />
              {unreaded > 0 && (
                <span className="bg-red-500 text-white w-[60%] text-[10px] aspect-square rounded-full flex justify-center items-center absolute top-0 -right-1">
                  {unreaded}
                </span>
              )}
            </Link>
            <Link to="/messages">
              <MailOutlineIcon className="cursor-pointer hover:text-blue-500" />
            </Link>
            {user ? (
              <Link to={`/profile/${user.id}`}>
                <PersonOutlineIcon className="cursor-pointer hover:text-blue-500" />{" "}
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>

          {/* Center: Logo */}
          <div
            className={`md:w-1/3 w-full flex flex-1 md:justify-center ${
              isMessagePage && "hidden"
            }`}
          >
            <img src="/twitter-logo.png" alt="Twitter Logo" width={"40px"} />
          </div>

          {/* Right: Search and Tweet Button */}
          <div className="relative ml-4 md:ml-0 lg:w-1/3 md:w-auto w-full">
            <form onSubmit={handleSearchSubmit} className="formNav">
              <MentionsInput
                value={inputValue} // Proporcionar el valor del estado al input
                onClick={() => {setInputValue("")}}
                onChange={(e) => setInputValue(e.target.value)} // Manejar cambios en el input
                placeholder="Buscar Usuarios"
                className={`${
                  isMessagePage && !isDesktopOrLaptop && "hidden"
                } border rounded-full w-full lg:w-3/4 pl-10 pr-4 py-1 focus:outline-none focus:border-blue-500`}
              >
                <Mention
                  trigger=""
                  className=""
                  value={inputValue}
                  data={users}
                  renderSuggestion={(
                    suggestion,
                    search,
                    highlightedDisplay,
                    index,
                    focused
                  ) => (
                    <Link
                      to={`/profile/${suggestion.id}`}
                      onClick={() => setInputValue("")}
                      className={`user my-2 p-2 block ${
                        focused ? "focused bg-slate-100 w-full h-full" : ""
                      }`}
                    >
                      {highlightedDisplay}
                    </Link>
                  )}
                />
              </MentionsInput>
              <button type="submit" className="hidden">
                Search
              </button>{" "}
              {/* Invisible button to allow form submission on Enter */}
            </form>
          </div>
          <div
            className={`${
              isDesktopOrLaptop || isMessagePage
                ? "hidden"
                : "fixed bottom-16 right-5"
            }`}
          >
            <AddIcon
              style={{ fontSize: "2.5rem" }}
              className="cursor-pointer text-white bg-blue-500 p-2 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      {!isDesktopOrLaptop && (
        <div
          className={`fixed ${
            isMessagePage ? "top-0" : "bottom-0"
          } left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-2`}
        >
          <Link to="/">
            <HomeIcon className="cursor-pointer hover:text-blue-500" />
          </Link>
          <Link to="/notifications" className="relative">
            <NotificationsIcon className="cursor-pointer hover:text-blue-500" />
            {unreaded > 0 && (
              <span className="bg-red-500 text-white w-[60%] text-[10px] aspect-square rounded-full flex justify-center items-center absolute top-0 -right-1">
                {unreaded}
              </span>
            )}
          </Link>
          <Link to="/messages">
            <MailOutlineIcon className="cursor-pointer hover:text-blue-500" />
          </Link>
          <Link to={`/profile/${user.id}`}>
            <PersonOutlineIcon className="cursor-pointer hover:text-blue-500" />
          </Link>

          <div className="relative">
            <MoreHorizIcon
              className="cursor-pointer hover:text-blue-500"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div
                className={`absolute right-0 ${
                  isMessagePage ? "top" : "bottom"
                }-[calc(100%+0.5rem)] bg-white border border-gray-300 rounded-md p-2 mt-2`}
              >
                <Link to="/login" className="block mb-2 text-red-500 text-xl">
                  Log out
                </Link>
                <Link
                  to="/saved"
                  className="block mb-2 hover:text-blue-500 text-xl"
                >
                  Guardados
                </Link>
                <Link
                  to="/settings"
                  className="block hover:text-blue-500 text-xl"
                >
                  Configuración
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
