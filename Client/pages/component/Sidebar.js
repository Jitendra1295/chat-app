// Sidebar.js
import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, useMediaQuery, Tooltip, ListItemAvatar, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useChat } from './context/chatContext';

const Sidebar = ({ user }) => {
    const router = useRouter();
    const { profile, setProfile, SetNewChat, setMobileView } = useChat();
    console.log("profile::2", profile, user);
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigateTo = (path) => {
        router.push(path);
    };

    const handleClick = () => {
        setProfile(prevProfile => {
            console.log("setProfile:", !prevProfile);
            return !prevProfile; // Toggle profile state
        });
    }

    const handleHome = () => {
        isMobile && setMobileView(false)
    }

    const handleNewChat = () => {
        setProfile(false)
        SetNewChat(true);
        setMobileView(false)
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isMobile ? "100%" : 60,
                    height: isMobile ? 60 : '100%',
                    display: "flex",
                    flexDirection: isMobile ? "row" : "column",
                    boxSizing: 'border-box',
                    backgroundColor: '#121212',
                    overflow: 'hidden' // Remove scrollbar by hiding overflow
                },
            }}
        >
            <List sx={{ display: 'flex', marginTop: isMobile ? 1 : 1.5, flexDirection: isMobile ? "row" : "column", gap: isMobile ? 0 : 2, height: "50px" }}>
                <ListItemButton onClick={() => handleClick()} >
                    <Tooltip title="Profile" placement="right">
                        <ListItemAvatar>
                            <Avatar alt="Profile" src={user?.pic} style={{ width: 35, height: 34 }} />
                        </ListItemAvatar>
                    </Tooltip>
                </ListItemButton>
                <ListItemButton >
                    <Tooltip title="Home" placement="right" onClick={() => handleHome()}>
                        <ListItemIcon style={{ color: 'white' }}>
                            <HomeIcon />
                        </ListItemIcon>
                    </Tooltip>
                </ListItemButton>
                <ListItemButton >
                    <Tooltip title="Groups" placement="right">
                        <ListItemIcon style={{ color: 'white' }}>
                            <GroupsIcon />
                        </ListItemIcon>
                    </Tooltip>
                </ListItemButton>
                <ListItemButton onClick={() => handleNewChat()}>
                    <Tooltip title="New chat" placement="right">
                        <ListItemIcon style={{ color: 'white' }}>
                            <AddOutlinedIcon />
                        </ListItemIcon>
                    </Tooltip>
                </ListItemButton>

                {/* Add more sidebar items as needed */}
            </List >
            <List sx={{ marginTop: isMobile ? "" : 'auto', marginLeft: isMobile ? 'auto' : '', height: "50px", display: 'flex', flexDirection: isMobile ? "row" : "column" }}>
                <ListItemButton onClick={() => navigateTo('/settings')}>
                    <Tooltip title="Settings" placement="center">
                        <ListItemIcon style={{ color: 'white' }}>
                            <SettingsIcon />
                        </ListItemIcon>
                    </Tooltip>
                </ListItemButton>
            </List>
        </Drawer >
    );
};

export default Sidebar;
