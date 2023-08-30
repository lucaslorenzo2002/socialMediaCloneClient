import React, { useEffect } from "react";
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
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const { notifications: reduxNotifications, loading } = useSelector(
    (state) => state.notifications
  );

  const user = useSelector((state) => state.user);


  useEffect(() => {
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
  }, [reduxNotifications, loading, dispatch]);

  const unreaded = reduxNotifications.filter((item) => !item.readed).length;

  return (
    <header className="w-full bg-white py-4 px-8 border-b border-gray-200 fixed w-full: top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center w-full">
          {/* Left: Icons */}
          <div className={`${isDesktopOrLaptop ? "flex" : "hidden"} space-x-6 lg:w-1/3 md:w-auto w-full`}>
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
            <Link to="/">
              <MailOutlineIcon className="cursor-pointer hover:text-blue-500" />
            </Link>
            <Link to={`/profile/${user.id}`}>
              <PersonOutlineIcon className="cursor-pointer hover:text-blue-500" />
            </Link>
          </div>

          {/* Center: Logo */}
          <div className="lg:w-1/3 md:w-auto w-full flex flex-1 lg:justify-center">
            <img src="/twitter-logo.png" alt="Twitter Logo" width={"40px"} />
          </div>

          {/* Right: Search and Tweet Button */}
          <div className="relative ml-4 md:ml-0 lg:w-1/3 md:w-auto w-full">
            <SearchIcon className="absolute left-3 top-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Twit"
              className="border rounded-full w-full lg:w-3/4 pl-10 pr-4 py-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div
            className={`${
              isDesktopOrLaptop ? "hidden" : "fixed bottom-16 right-5"
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
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-2">
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
          <Link to="/">
            <MailOutlineIcon className="cursor-pointer hover:text-blue-500" />
          </Link>
          <Link to={`/profile/${user.id}`}>
            <PersonOutlineIcon className="cursor-pointer hover:text-blue-500" />
          </Link>

          <Link to="/">
            <MoreHorizIcon className="cursor-pointer hover:text-blue-500" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
