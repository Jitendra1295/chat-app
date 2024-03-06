// SignUp.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import SignUpForm from './SignUpForm';
import SignIn from './SignIn'
import { useChat } from './context/chatContext';
import { useMediaQuery } from '@mui/material';

export default function User() {
    const { pageView } = useChat();
    console.log("pageView::", pageView);
    const isMobile = useMediaQuery('(max-width:600px)');
    const showPage = () => {
        switch (pageView) {
            case 'login':
                return <SignIn />;
            case 'signup':
                return <SignUpForm />;
        }
    }

    return (
        <Grid container spacing={10} alignItems="center" justifyContent="flex-start">
            {!isMobile && <Grid item xs={6}>
                <Box sx={{
                    textAlign: 'center', alignSelf: "flex-start", width: "100%", marginLeft: 5, borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px', height: "98vh", background: 'linear-gradient(to right, #754FEC, #EDF8FD)'
                }}>
                    <Box sx={{ margin: 'auto' }}>
                        <Image src="/chat.png" alt="Logo" style={{ margin: "auto", marginTop: "15%" }} width={60} height={60} />
                        <Typography
                            style={{
                                color: "#FFFFFF",
                                marginTop: "20px",
                                fontSize: 28,
                                fontWeight: 700,
                                textShadow: "2px 2px 2px #000, -2px -2px 2px #000, 2px -2px 2px #000, -2px 2px 2px #000"
                            }}> Digital Chat</Typography>
                    </Box>
                    <Box sx={{ marginTop: "50px" }}>
                        <Typography
                            style={{
                                color: "#FFFFFF",
                                fontSize: 28,
                                fontWeight: 500,
                                whiteSpace: 'pre-line',
                                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(0, 0, 0, 0.5), 1px -1px 1px rgba(0, 0, 0, 0.5), -1px 1px 1px rgba(0, 0, 0, 0.5)"
                            }}>Share Your Smile with <br />this world and Meet Friends</Typography>
                        <Image src="/tea.png" alt="Logo" style={{ margin: "auto", marginTop: "5%" }} width={60} height={60} />
                    </Box>
                    <Box sx={{ marginTop: "50px" }}>
                        <Typography
                            style={{
                                color: "#FFFFFF",
                                fontSize: 28,
                                fontWeight: 200,
                                whiteSpace: 'pre-line',
                                textShadow: "0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(0, 0, 0, 0.5), 1px -1px 1px rgba(0, 0, 0, 0.5), -1px 1px 1px rgba(0, 0, 0, 0.5)"
                            }}>Enjoy..!</Typography>
                    </Box>
                </Box>
            </Grid>}
            <Grid item xs={6}>
                {showPage()}
                {/* <SignIn handleSubmit={handleSubmit} /> */}
            </Grid>
        </Grid>
    );
}
