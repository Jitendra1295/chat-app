// SignUpForm.js
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useChat } from './context/chatContext';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';

import axios from 'axios';
export default function SignIn() {
    const { setPageView, setUser } = useChat();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isMobile = useMediaQuery('(max-width:600px)');
    const router = useRouter();
    const handleSubmit = async () => {
        console.log("handleSubmit::", email, password, event);
        try {
            // Make a POST request to your backend login API
            const response = await axios.post('http://localhost:8080/api/user/login', {
                email,
                password
            });

            // Check if the response is successful
            if (response.status === 200) {
                // If successful, log the response data
                console.log('Login successful:', response.data);
                router.push(`/Home?userId=${response?.data?.user._id}`);
            } else {
                // If not successful, log an error message
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            // Handle any network or server errors
            console.error('Error logging in:', error.message);
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 10,
                width: isMobile ? "100%" : "70%",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { handleSubmit() }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item >
                        <Link href="#" variant="body2" >
                            <span onClick={() => { setPageView("signup") }}>{"Don't have an account? Sign Up"}</span>
                        </Link>
                    </Grid>
                </Grid>
            </Box>

        </Box >
    );
}


