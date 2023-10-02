import React, { useState, useRef, useEffect } from "react";
import TwitterNotification from "../../components/twitterNotification/TweeterNotification";
import CONFIG from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../redux/notificationsSlice";
import NotificationContainer from "../../components/notificationContainer/NotificationContainer";

const Notificatons = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const token = useSelector((state) => state.token);

  const [activeTab, setActiveTab] = useState("Todas");
  const tabs = ["Todas", "Retweets", "Menciones", "Likes"];
  const [lineStyles, setLineStyles] = useState({});
  const buttonsRef = useRef([]);

  if (!token) {
    toast.error("Debes iniciar sesión para ver tus notificaciones.");
    window.location.href = "/login";
    return null;
  }

  const api = axios.create({
    baseURL: CONFIG.BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      // Check if notifications are already in the Redux state.
      if (notifications && notifications.length) return;

      // Fetch notifications from the server.
      dispatch(fetchStart());
      try {
        const response = await api.get("/notificaciones");
        dispatch(fetchSuccess(response.data.data));
      } catch (err) {
        dispatch(fetchError(err.message));
      }
    };
    fetchData();
  }, [token, dispatch, notifications]);

  useEffect(() => {
    const activeButton = buttonsRef.current.find(
      (btn) => btn.textContent === activeTab
    );
    if (activeButton) {
      setLineStyles({
        width: `${100 / tabs.length}%`,
        left: `${activeButton.offsetLeft}px`,
      });
    }
  }, [activeTab, tabs.length]);

  const filterNotificationsByType = (notifications, type) => {
    return notifications.filter((noti) => noti.notification_type === type);
  };

  return (
    <div className="flex-1 p-4 w-full">
      <div className="flex border-b mb-4 relative text-sm md:text-base">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 transition-colors duration-200 
            ${
              activeTab === tab
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}

        <div
          className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
          style={lineStyles}
        ></div>
      </div>

      {activeTab === "Todas" && (
        <NotificationContainer
          notis={[...notifications].reverse()}
          altText="No hay notificaciones disponibles."
        />
      )}
      {activeTab === "Retweets" && (
        <NotificationContainer
          notis={filterNotificationsByType(notifications, "comentario!")}
          altText="No hay retweets disponibles."
        />
      )}
      {activeTab === "Menciones" && (
        <NotificationContainer
          notis={filterNotificationsByType(
            notifications,
            "mention"
          )}
          altText="No hay menciones disponibles."
        />
      )}
      {activeTab === "Likes" && (
        <NotificationContainer
          notis={filterNotificationsByType(notifications, "like")}
          altText="No hay likes disponibles."
        />
      )}
    </div>
  );
};

export default Notificatons;
