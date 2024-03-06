import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "../../styles/profile.module.css";
import Image from 'next/image';
import { Grid, ListItemText, ListItem, Typography, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useChat } from './context/chatContext';

const ListContainer = styled(Grid)({
    width: '100%',
    height: '98vh', // Set height to fill the viewport height
    overflow: 'hidden', // Hide overflow to prevent vertical scrollbar
});

const ListWithScrollbar = styled(ListItem)({
    overflowY: 'auto',
    flexGrow: 1, // Allow the ListItem to grow to fill the available space
});

const Profile = ({ user }) => {
    const { setProfile } = useChat();
    const handleArrowBackClick = () => {
        setProfile(prevProfile => {
            console.log("setProfile:", !prevProfile);
            return !prevProfile; // Toggle profile state
        });
    }
    return (
        <ListContainer container direction="column">
            <ListItem style={{ borderRadius: '5px 0 0 0', backgroundColor: '#081218', height: "120px" }}>
                <ListItemButton onClick={handleArrowBackClick}>
                    <ArrowBackIcon className={styles.customListItemIcon} />
                    <ListItemText primary="Profile" classes={{ primary: styles.customListItemText }} />
                </ListItemButton>
            </ListItem>
            <ListWithScrollbar style={{ backgroundColor: '#191919', flexDirection: "column" }}>
                <Grid style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <Image
                        src={user?.pic}
                        alt="Logo"
                        style={{ borderRadius: '50%', overflow: 'hidden', margin: 20 }}
                        width={180}
                        height={180}
                    />
                </Grid>
                <Grid container spacing={2} style={{ marginLeft: 15 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ color: 'green' }} gutterBottom>
                            Your Name
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ color: 'white' }}>
                            {user?.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "30px", marginLeft: 15 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ color: 'green' }} gutterBottom>
                            About
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ color: 'white' }}>
                            At work
                        </Typography>
                    </Grid>
                </Grid>
            </ListWithScrollbar>
        </ListContainer >
    );
};

export default Profile;
