import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "../../styles/profile.module.css";
import { Grid, ListItemText, ListItem, TextField, IconButton, Tooltip, ListItemAvatar, Avatar, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useChat } from './context/chatContext';
import axios from 'axios'
import { useMediaQuery } from '@mui/material';

const ListContainer = styled(Grid)({
    width: '100%',
    height: '98vh', // Set height to fill the viewport height
    overflow: 'hidden', // Hide overflow to prevent vertical scrollbar
});

const ListWithScrollbar = styled(ListItem)({
    overflowY: 'auto',
    flexGrow: 1, // Allow the ListItem to grow to fill the available space
});

const ListItemHover = styled(ListItem)({
    '&:hover': {
        backgroundColor: '#333333', // Adjust the hover background color as needed
    },
});
const NewChat = ({ userList }) => {
    const { SetNewChat, setUser, setSelectedChat, token, setMobileView } = useChat();
    const isMobile = useMediaQuery('(max-width:600px)');
    console.log("userList:", userList);
    const handleArrowBackClick = () => {
        SetNewChat(prevProfile => {
            console.log("setProfile:", !prevProfile);
            return !prevProfile; // Toggle profile state
        });

    }
    const handleNewChat = async (user) => {
        console.log("handleNewChat::", user);
        try {
            // setLoadingChat(true)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const userId = user?._id;
            console.log("accessChat ::", user?._id, userId);
            const { data } = await axios.post("http://localhost:8080/api/chat", { userId }, config);
            console.log("accessChat Result ::", data);
            // setLoadingChat(false);
            setSelectedChat(data);
            setUser(user)
            isMobile && setMobileView(true);

        } catch (error) {
            console.log("Search Result ::error", error);
            // setLoadingChat(false);
        }

    }

    return (
        <ListContainer container direction="column">
            <ListItem style={{ borderRadius: '5px 0 0 0', backgroundColor: '#081218', height: "90px" }}>
                <ListItemButton onClick={handleArrowBackClick}>
                    <ArrowBackIcon className={styles.customListItemIcon} />
                    <ListItemText primary="New chat" classes={{ primary: styles.customListItemText }} />
                </ListItemButton>
            </ListItem>
            <ListItem style={{ backgroundColor: '#081218', height: "90px" }}>
                <TextField
                    placeholder='Search'
                    variant="outlined"
                    fullWidth
                    // value={searchTerm}
                    // onChange={handleSearchChange}
                    InputProps={{
                        style: {

                            height: "67px",
                            fontSize: 20,
                            color: '#FFFFFF', // Set font color to white
                            backgroundColor: '#3F3F3F' // Set background color
                        },
                        startAdornment: (
                            <IconButton aria-label="search">
                                <SearchIcon style={{ color: '#FFFFFF' }} />
                            </IconButton>
                        )
                    }}
                    style={{ width: "100%", borderRadius: "5px", backgroundColor: '#333333', hight: "75px" }}
                />
            </ListItem>
            <ListWithScrollbar style={{ backgroundColor: '#191919', flexDirection: "column" }}>
                {userList && userList.map((user) => (
                    <ListItemHover key={user.id} onClick={() => { handleNewChat(user) }}>
                        <ListItemAvatar>
                            <Tooltip label={user.name} placement="bottom-start" hasArrow>
                                <Avatar alt={user.name} src={user?.pic} style={{ backgroundColor: '#1977e2' }} />
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText primary={user.name}
                            style={{
                                color: 'white',
                                borderRadius: '10px',
                                fontWeight: 800
                            }}
                        />
                    </ListItemHover>
                ))}
            </ListWithScrollbar>
        </ListContainer >
    );
};

export default NewChat;
