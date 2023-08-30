import React from "react";
import TwitterNotification from "../twitterNotification/TweeterNotification";

const NotificationContainer = ({notis, altText}) => {
  return (
    <div>
      {notis.length === 0 ? (
        <p className="text-center mt-10 text-slate-400">{altText}</p>
      ) : (
        notis.map((noti) => (
          <TwitterNotification
            key={noti.id}
            readed={noti.readed}
            title={noti.title}
            text={noti.message}
          />
        ))
      )}
    </div>
  );
};

export default NotificationContainer;

