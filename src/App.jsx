import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import io from "socket.io-client";

import { setConnectedUsers } from "./redux/connectedUsersSlice";

import NavBar from "./components/navBar/NavBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/Explore";
import Error from "./pages/error/Error";
import Saved from "./pages/saved/Saved";
import Login from "./pages/login/Login";
import RegisterPage from "./pages/register/RegisterPage";
import Notifications from "./pages/notis/Notifications";
import SidebarRight from "./components/sidebarRight/SidebarRight";
import SidebarLeft from "./components/sidebarLeft/SidebarLeft";
import Messages from "./pages/messages/Messages";
import Settings from "./pages/settings/Settings";
import EmailConfirm from "./pages/emailConfirm/emailConfirm";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

const token = localStorage.getItem("token");

const socket = io("https://backtwclone-production.up.railway.app/", {
  auth: {
    token: `Bearer ${token}`,
  },
});

const Layout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const isTabletOrLarger = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  return (
    <div className="mx-auto">
      <NavBar />
      {user && (
        <div>
          <div className="container mx-auto mt-16">
            <div className="flex">
              {isDesktopOrLaptop && (
                <div className="w-1/4 px-2">
                  <SidebarLeft />
                </div>
              )}
              <div className="flex-1">
                <Outlet />
              </div>
              {/* El componente de la ruta específica se renderizará aquí */}
              {isTabletOrLarger && (
                <div className="w-1/4 px-2">
                  <SidebarRight />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="overflow-x-hidden">
        <SocketProvider socket={socket}>
          <Toaster />

          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                  path="/profile/:id"
                  element={<Profile socket={socket} />}
                />
                <Route path="/explore" element={<Explore />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="/messages" element={<Messages socket={socket} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/emailConfirmation" element={<EmailConfirm />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </SocketProvider>
      </div>
    </Provider>
  );
}

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Conecta con websocket
    socket.connect();

    // Se desuscribe cuando se desmonta el componente
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    socket.on("users connected", (data) => {
      dispatch(setConnectedUsers(data));
    });
  }, [dispatch, socket]);

  return children;
};

export default App;
