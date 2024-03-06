// CounterContext.js
import React, { createContext, useState, useContext } from 'react';

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState("");
    const [notification, setNotification] = useState([]);
    const [pageView, setPageView] = useState("login");
    const [newChat, SetNewChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState();
    const [token, setToken] = useState();
    const [mobileView, setMobileView] = useState(false);

    return (
        <chatContext.Provider value={{ mobileView, setMobileView, token, setToken, notification, setNotification, profile, setProfile, user, setUser, pageView, setPageView, newChat, SetNewChat, selectedChat, setSelectedChat }}>
            {children}
        </chatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(chatContext);
};
