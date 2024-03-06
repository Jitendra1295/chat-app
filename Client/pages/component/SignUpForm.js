// SignUpForm.js
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/base/FormControl';
import { FormLabel } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useChat } from './context/chatContext';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useToast } from '@chakra-ui/react'

import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reTypepassword, setReTypepassword] = useState("");
    const [picLoading, setPicLoading] = useState(false);
    const [pic, setPic] = useState([]);
    const [error, setError] = useState("");
    const { setPageView } = useChat();
    const router = useRouter();
    const toast = useToast()
    const isMobile = useMediaQuery('(max-width:600px)');
    const handleSubmit = async () => {
        console.log("handleSubmit::", email, password, event);
        try {
            // Make a POST request to your backend login API
            if (!password || !firstName || !lastName || !email) {
                console.log("all the field required");
                setError("all the field required")
                return;
            }
            if (password !== reTypepassword) {
                console.log("password does not match");
                setError("conform password does not match")
                return;
            }
            const obj = {
                name: `${firstName} ${lastName}`,
                email,
                password,
                isAdmin: false,
                pic
            }
            const response = await axios.post('http://localhost:8080/api/user/signup', { ...obj });
            console.log("response::", response);
            // Check if the response is successful
            if (response.status === 201) {
                // If successful, log the response data
                console.log('Login successful:', response.data);
                router.push("/Home")
            } else {
                // If not successful, log an error message
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            // Handle any network or server errors
            console.error('Error logging in:', error.message);
            setError(error.message)
        }
    };
    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat_app");
            data.append("cloud_name", "dcghavcwl");
            fetch("https://api.cloudinary.com/v1_1/dcghavcwl/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log("url::", data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            setError("jpeg/png type image support")
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
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
                SIGN UP HERE
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
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
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setReTypepassword(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <FormControl id="pics">
                            <FormLabel>Upload your Picture :</FormLabel>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                onChange={(e) => {
                                    postDetails(e.target.files[0]);
                                }}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button>

                        </FormControl>
                    </Grid>
                </Grid>
                {error && <Grid container justifyContent="center">
                    <Typography style={{ color: "red", marginTop: 20 }}>{error}</Typography>
                </Grid>}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disable={picLoading}
                    onClick={() => { handleSubmit() }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            <span onClick={() => { setPageView("login") }}>
                                Already have an account? Sign in</span>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
