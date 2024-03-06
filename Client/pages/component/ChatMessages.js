import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import styles from "../../styles/profile.module.css";
import SendIcon from '@mui/icons-material/Send';
import { Spinner } from "@chakra-ui/react";
import EmptyChatMessagePage from './EmptyChatMessagePage';
import {
    Grid,
    IconButton,
    TextField,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    colors
} from '@mui/material';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';

import io from "socket.io-client";
import { useChat } from './context/chatContext';
const ENDPOINT = "http://localhost:8080/";
var socket, selectedChatCompare;
const ListContainer = styled(Grid)({
    width: '100%', // Set width to 100% to expand to the container's width
});
const ListWithScrollbar = styled(Grid)({
    overflowY: 'auto',
    flexGrow: 1,
    backgroundImage: `url('/logo.jpg')`,
    backgroundSize: 'contain',
    height: '100vh',
});
const ChatMessages = ({ loginUser }) => {
    const [messageInput, setMessageInput] = useState('');
    const [chatMessage, setChatMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { user, selectedChat, notification, setNotification, token } = useChat();
    const isMobile = useMediaQuery('(max-width:600px)');
    const userInfo = {
        name: "Jitendra Patel",
        isOnline: true
    };
    console.log("ChatMessages::", user, loginUser);

    useEffect(() => {
        console.log("fetchMessages::useEffect:", user._id);
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [user?._id]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", loginUser);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

    }, []);

    useEffect(() => {
        socket.on("jitendraMsg", (newMessageReceived) => { // listen for "message received" event
            console.log("message received::", newMessageReceived);
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    fetchMessages();
                }
            } else {
                setChatMessages([...chatMessage, newMessageReceived]);
            }
        });
    });


    const handleMessageChange = (event) => {
        setMessageInput(event.target.value);
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    const fetchMessages = async () => {
        if (!user) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log("fetchMessages::config:", config);
            setLoading(true);

            const { data } = await axios.get(
                `http://localhost:8080/api/message/${selectedChat._id}`,
                config
            );
            console.log("fetchMessages::", data);
            setChatMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            console.log("error::", error);
        }
    };

    // Here you can send the message
    const sendMessage = async (event) => {
        console.log("Sending message:", messageInput);
        if (messageInput) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                setMessageInput('');
                const { data } = await axios.post(
                    "http://localhost:8080/api/message/send",
                    {
                        content: messageInput,
                        chatId: selectedChat._id,
                    },
                    config
                );
                console.log("Sending message response:", data);

                // Handle the case where data is not an array
                socket.emit("new message", data);

                setChatMessages([...chatMessage, data]);
            } catch (error) {
                console.log("error message :", error);
            }
        }
    };
    // Clear the message input field after sending
    console.log("chatMassage ::", chatMessage);

    return (
        <ListContainer container direction="column">
            {user && <ListItem style={{ height: 67, backgroundColor: '#3F3F3F', }}>
                <ListItemAvatar>
                    <Avatar alt={user.name} src={user?.pic} />
                </ListItemAvatar>
                <ListItemText
                    primary={user?.name}
                    secondary={
                        <Typography
                            sx={{ display: 'inline', fontWeight: 500, color: userInfo.isOnline ? 'green' : 'red' }}
                            component="span"
                            variant="body2"
                        >
                            {userInfo.isOnline ? 'Online' : 'Offline'}
                        </Typography>
                    }
                    classes={{ primary: styles.customNavbarPrimary, secondary: styles.customNavbarSecondary }}
                />
            </ListItem>}
            {user && <ListWithScrollbar style={{ height: '77.9vh', width: isMobile && "100%" }}>
                {loading ? (
                    <Spinner
                        size="xl"
                        w={20}
                        h={20}
                        alignSelf="center"
                        margin="auto"
                    />
                ) : (
                    <div>
                        {
                            chatMessage.map((message, index) => (
                                <ListItem
                                    key={index}
                                    style={{
                                        margin: '4px 8px', // Adjust margin for spacing between messages
                                        width: 'fit-content', // Set width to fit the content
                                        maxWidth: "60%",
                                        textAlign: message?.sender?.name === user.name ? 'left' : 'right', // Align text based on sender
                                        marginLeft: message?.sender?.name !== user.name ? 'auto' : 'unset', // Push received messages to the left
                                        marginRight: message?.sender?.name === user.name ? 'auto' : 'unset' // Push sent messages to the right
                                    }}
                                >
                                    <ListItemText
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '9px',
                                            color: message?.sender?.name === user.name && "#FFFFFF",
                                            backgroundColor: message?.sender?.name === user.name ? '#3F3F3F' : '#79AE84',
                                            width: '100%', // Ensure the text content takes up the full width of the ListItem
                                        }}
                                        classes={{ secondary: message?.sender?.name === user.name && styles.chatTimeValue }}
                                        primary={message.content}
                                        secondary={message?.timestamp}
                                    />
                                </ListItem>
                            ))
                        }
                    </div>)
                }
            </ListWithScrollbar>}

            {/* Text field for typing messages */}
            {user && <Grid container alignItems="center" justifyContent="center" style={{ backgroundColor: '#3F3F3F' }}>
                <TextField
                    variant="outlined"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={handleMessageChange}
                    InputProps={{
                        style: {
                            borderRadius: "9px",
                            fontSize: 20,
                            height: 55,
                        },
                    }}
                    style={{ marginLeft: 30, borderRadius: "9px", marginTop: 2, flex: 1, backgroundColor: "#808080" }}
                />
                <IconButton style={{ width: 50, backgroundColor: "#808080", borderRadius: "9px", margin: 20 }} color="primary" onClick={() => { sendMessage() }}>
                    <SendIcon />
                </IconButton>
            </Grid>
            }
            {!user && <ListItem style={{ height: "98vh", backgroundColor: '#3F3F3F', alignItems: "center", justifyContent: "center", }}>
                <EmptyChatMessagePage />
            </ListItem>
            }
        </ListContainer>
    );
};

export default ChatMessages;
