import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';

// const defaultTheme = createTheme();

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Grid container spacing={10} alignItems="center" justifyContent="flex-start">
            <Grid item xs={6}>
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
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: 10,
                        width: "70%",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        SIGN UP HERE
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Re-Enter password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid >
    );
}
