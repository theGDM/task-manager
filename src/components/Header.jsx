import React, { useEffect, useState } from "react";
import { Button, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import logo from '../assets/vooshlogo.png';
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from '../assets/profile.png';
import man from '../assets/man.png';
import woman from '../assets/woman.png';
import boy from '../assets/boy.png';
import girl from '../assets/girl.png';
import panda from '../assets/panda.png';
import rabbit from '../assets/rabbit.png';
import bear from '../assets/bear.png';

export default function Header() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem('userEmail'));
    let userData = useSelector((state) => state.userData);

    const avatarCreator = () => {
        let id = localStorage.getItem('avatarId');
        switch (parseInt(id)) {
            case 1: return <img src={profile} style={{ height: '80%' }} />;
            case 2: return <img src={man} style={{ height: '80%' }} />;
            case 3: return <img src={woman} style={{ height: '80%' }} />;
            case 4: return <img src={boy} style={{ height: '80%' }} />;
            case 5: return <img src={girl} style={{ height: '80%' }} />;
            case 6: return <img src={panda} style={{ height: '80%' }} />;
            case 7: return <img src={rabbit} style={{ height: '80%' }} />;
            case 8: return <img src={bear} style={{ height: '80%' }} />;
        }
    }

    const handleNavigation = (text) => {
        if (text == 'login') {
            navigate('/');
        } else if (text == 'register') {
            navigate('/register');
        } else {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userId");
            navigate('/');
        }
    }

    return (
        <Box width='100vw' height='8vh' display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' bgcolor={colors.blackAccent[600]} p='0 10px' sx={{ boxShadow: "0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.9)" }}>
            {!user ? <img src={logo} style={{ height: '80%' }} /> : avatarCreator()}
            {!user ? <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '0.3rem',
                        mb: '0.2rem',
                        backgroundColor: colors.greenAccent[500],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0'
                    }}
                    onClick={() => handleNavigation('login')}
                >
                    Login
                </Button>
                <Box width='1.5rem'></Box>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            mt: '0.3rem',
                            mb: '0.2rem',
                            backgroundColor: colors.greenAccent[500],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[600], // Set your desired hover color
                            },
                            fontSize: '1.2rem',
                            borderRadius: '0'
                        }}
                        onClick={() => handleNavigation('register')}
                    >
                        Signup
                    </Button>
                </Box>
            </Box> : <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '0.3rem',
                        mb: '0.2rem',
                        backgroundColor: colors.redAccent[500],
                        "&:hover": {
                            backgroundColor: colors.redAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0'
                    }}
                    onClick={() => handleNavigation('logout')}
                >
                    Logout
                </Button>
            </Box>}
        </Box >
    );
}