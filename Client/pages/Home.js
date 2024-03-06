import * as React from 'react';
import { Grid, Divider } from '@mui/material';
import Sidebar from './component/Sidebar';
import ChatList from './component/ChatList';
import ChatMessages from './component/ChatMessages';
import Profile from './component/Profile';
import NewChat from './component/newChat';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useChat } from './component/context/chatContext';

export default function PermanentDrawerLeft(props) {
    const { profile, newChat, setToken, mobileView } = useChat();

    console.log("PermanentDrawerLeft::", props);
    setToken(props?.token)
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Grid container >

            <Grid item style={{ width: 35, margin: !isMobile && 3 }}>
                <Sidebar user={props.userData} />
            </Grid>
            <Grid item xs={isMobile ? 12 : 3} style={{ marginTop: isMobile ? 70 : 0, marginLeft: isMobile ? 0 : 10 }}>
                {
                    profile ? <Profile user={props.userData} /> : (!mobileView && newChat) ? <NewChat userList={props.userList} /> : !mobileView && <ChatList loginUser={props.userData} chats={props.chatList} />
                }
            </Grid>
            {
                !isMobile && (
                    <Grid item xs style={{ marginTop: isMobile ? 70 : 0 }}>
                        <ChatMessages loginUser={props.userData} />
                    </Grid>
                )
            }
            {isMobile && (
                <Grid item xs={12} style={{ marginLeft: isMobile ? 0 : 10 }}>
                    <ChatMessages loginUser={props.userData} />
                </Grid>
            )}
        </Grid >
    );
}


export async function getServerSideProps(context) {
    try {
        const { userId } = context.query; // Extract userId from query parameters
        // console.log("context::", userId);
        // Make a POST request using Axios
        const response = await axios.get(`http://localhost:8080/api/user/find?userId=${userId}`);

        const newUserToChat = await axios.get('http://localhost:8080/api/user/getAllUser', {
            data: {
                user: {
                    _id: userId
                }
            }
        });


        console.log("newUserToChat::", newUserToChat.data);

        // Extract data from the response
        const userData = response?.data?.user;

        // console.log("getServerSideProps::", response, userId);

        const token = response?.data?.token;

        console.log("cookieHeader::", token);

        if (!token) {
            throw new Error('Token cookie not found');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        console.log("config::", config);

        const { data } = await axios.get("http://localhost:8080/api/chat/", config);

        console.log("getServerSideProps:: chat data::", data);

        // Return data as props
        return {
            props: {
                userData,
                token,
                chatList: data,
                userList: newUserToChat?.data
            }
        };
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        return {
            props: {
                error: "error"
            }
        };
    }
}

