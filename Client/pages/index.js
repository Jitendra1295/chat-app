import * as React from 'react';
import { Grid, Divider } from '@mui/material';
import Sidebar from './component/Sidebar';
import ChatList from './component/ChatList';
import ChatMessages from './component/ChatMessages';
import Profile from './component/Profile';
import { useMediaQuery } from '@mui/material';
import User from "./component/User"
import { useChat } from './component/context/chatContext';

export default function PermanentDrawerLeft() {
    const { profile, user } = useChat();

    console.log("profile::1", profile);
    const isMobile = useMediaQuery('(max-width:600px)');
    const chats = [
        { id: 1, name: 'John Doe', avatarUrl: '/avatars/john.png', lastMessage: 'Hello there!' },
        { id: 2, name: 'Jane Smith', avatarUrl: '/avatars/jane.png', lastMessage: 'How are you?' },
        { id: 1, name: 'John Doe', avatarUrl: '/avatars/john.png', lastMessage: 'Hello there!' },
        { id: 2, name: 'Jane Smith', avatarUrl: '/avatars/jane.png', lastMessage: 'How are you?' },
    ];
    const messages = [
        { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        { id: 1, text: 'Hii new provider video will work for u, so u have to take pull from master and check if build is create successfully or not !', timestamp: '10:00 AM', sender: 'self' },
        { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },
        // { id: 1, text: 'Hello!', timestamp: '10:00 AM', sender: 'self' },
        // { id: 2, text: 'How are you?', timestamp: '10:05 AM', sender: 'other' },

        // Add more message objects as needed
    ];

    return (
        <Grid container >
            <Grid item xs={12}>
                <User />
            </Grid>
            {user && <Grid item style={{ width: 35, margin: !isMobile && 3 }}>
                <Sidebar />
            </Grid>}
            {user && <Grid item xs={isMobile ? 12 : 3} style={{ marginTop: isMobile ? 70 : 0, marginLeft: isMobile ? 0 : 10 }}>
                {
                    profile ? <Profile /> : <ChatList chats={chats} />
                }
            </Grid>}
            {
                (user && !isMobile) && (
                    <Grid item xs style={{ marginTop: isMobile ? 70 : 0 }}>
                        <ChatMessages messages={messages} />
                    </Grid>
                )
            }
            {/* {isMobile && (
                <Grid item xs={12} style={{ marginTop: isMobile && 50, marginLeft: isMobile ? 0 : 10 }}>
                    <ChatMessages messages={messages} />
                </Grid>
            )} */}
        </Grid >
    );
}
