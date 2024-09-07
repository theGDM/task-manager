import React, { useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import { Icon, ListItemIcon, ListItemText, MenuItem, Select, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import backgroundImageUrl from '../../assets/bg.jpg';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Header from "../../components/Header";
import { getUser, register } from "../../services/api";
import { auth, provider } from "../../config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import profile from '../../assets/profile.png';
import man from '../../assets/man.png';
import woman from '../../assets/woman.png';
import boy from '../../assets/boy.png';
import girl from '../../assets/girl.png';
import panda from '../../assets/panda.png';
import rabbit from '../../assets/rabbit.png';
import bear from '../../assets/bear.png';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatarValue, setAvatarValue] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistered, setRegistered] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (firstName == '') {
            toast('Please enter the first name!');
            return;
        }

        if (lastName == '') {
            toast('Please enter the last name!');
            return;
        }

        if (email == '') {
            toast('Please enter the email address!');
            return;
        }

        if (password == '') {
            toast('Password can not be empty!');
            return;
        }

        if (password != confirmPassword) {
            toast('Password mismatch! please enter exact password.');
            return;
        }

        setRegistered(true);
        let fullName = firstName + " " + lastName;
        let response = await register(fullName, email, password, avatarValue);
        setRegistered(false);
        toast(response.message);
        navigate('/');
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        setAvatarValue(e.target.value);
    }

    const handleNavigation = () => {
        navigate('/')
    }

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider).then(async (data) => {
            console.log(data);
            await register(data.user.displayName, data.user.email, '12345');
            let response = await getUser(data.user.email);
            console.log(response);
            if (response.message != null) {
                toast(response.message);
            } else {
                localStorage.setItem("userEmail", response.email);
                localStorage.setItem('userId', response._id);
                navigate('/dashboard');
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <Box width='100vw' height='100vh' position='relative' sx={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", imageOrientation: 'landscape', }}>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: 'absolute',
                    top: '54%',
                    left: '50%',
                    opacity: '0.95',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: colors.blackAccent[700],
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.9)",
                }}
            >
                <Avatar sx={{ m: '0.5rem', bgcolor: colors.greenAccent[500] }}>
                    <LockOutlinedIcon color={colors.greenAccent[500]} />
                </Avatar>
                <Typography component="h1" fontSize='1.6rem' fontWeight='600' color={colors.greenAccent[500]}>
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: '0.1rem' }}
                    width='35rem'
                    p='0rem 2rem'
                >
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="text"
                        variant="filled"
                        sx={{
                            backgroundColor: colors.blackAccent[600],
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust the font size as needed
                                height: '2rem', // Adjust the height of the text area
                                padding: '2.5rem 1.2rem 0.8rem 1.2rem', // Adjust the padding as needed
                            },
                        }}
                        label={
                            <Typography
                                fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                            >
                                First Name
                            </Typography>
                        }
                        FormHelperTextProps={{
                            style: {
                                color: colors.greenAccent[500],
                                fontSize: '1.3rem'
                            },
                        }}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoFocus
                    />
                    <Box height='1.5rem'></Box>
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="text"
                        variant="filled"
                        sx={{
                            backgroundColor: colors.blackAccent[600],
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust the font size as needed
                                height: '2rem', // Adjust the height of the text area
                                padding: '2.5rem 1.2rem 0.8rem 1.2rem', // Adjust the padding as needed
                            },
                        }}
                        label={
                            <Typography
                                fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                            >
                                Last Name
                            </Typography>
                        }
                        FormHelperTextProps={{
                            style: {
                                color: colors.greenAccent[500],
                                fontSize: '1.3rem'
                            },
                        }}
                        onChange={(e) => setLastName(e.target.value)}
                        autoFocus
                    />
                    <Box height='1.5rem'></Box>
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="text"
                        variant="filled"
                        sx={{
                            backgroundColor: colors.blackAccent[600],
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust the font size as needed
                                height: '2rem', // Adjust the height of the text area
                                padding: '2.5rem 1.2rem 0.8rem 1.2rem', // Adjust the padding as needed
                            },
                        }}
                        label={
                            <Typography
                                fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                            >
                                Email
                            </Typography>
                        }
                        FormHelperTextProps={{
                            style: {
                                color: colors.greenAccent[500],
                                fontSize: '1.3rem'
                            },
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <Box height='1.5rem'></Box>
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="password"
                        variant="filled"
                        sx={{
                            backgroundColor: colors.blackAccent[600],
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust the font size as needed
                                height: '2rem', // Adjust the height of the text area
                                padding: '2.5rem 1.2rem 0.8rem 1.2rem', // Adjust the padding as needed
                            },
                        }}
                        label={
                            <Typography
                                fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                            >
                                Password
                            </Typography>
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                    <Box height='1.5rem'></Box>
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="password"
                        variant="filled"
                        sx={{
                            backgroundColor: colors.blackAccent[600],
                            '& .MuiInputBase-input': {
                                fontSize: '1.3rem', // Adjust the font size as needed
                                height: '2rem', // Adjust the height of the text area
                                padding: '2.5rem 1.2rem 0.8rem 1.2rem', // Adjust the padding as needed
                            },
                        }}
                        label={
                            <Typography
                                fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                            >
                                Confirm Password
                            </Typography>
                        }
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoFocus
                    />
                    <Box height='1.5rem'></Box>
                    <Select
                        value={avatarValue}
                        onChange={handleChange}
                        sx={{
                            fontSize: '1.3rem', // Adjust the font size for the selected item
                            height: '3.6rem',
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.greenAccent[500],
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.greenAccent[500],// Border color when focused
                                borderWidth: '0.2rem'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.greenAccent[500],// Border color when focused
                                borderWidth: '0.2rem'
                            },
                            '.MuiSvgIcon-root ': {
                                borderColor: colors.greenAccent[500], // Default border color
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        fontSize: '1.3rem', // Adjust the font size for menu items
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem value={1} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={profile} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Profile
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={2} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={man} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Man
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={3} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={woman} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Women
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={4} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={boy} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Boy
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={5} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={girl} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Girl
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={6} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={panda} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Panda
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={7} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={rabbit} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Rabbit
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={7} >
                            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                                <img src={bear} alt="icon" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover' }} />
                                <Typography
                                    fontSize='1.3rem' sx={{ color: colors.greenAccent[500] }}
                                    pl='0.4rem'
                                >
                                    Bear
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Select>

                    {isRegistered == false ? <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: '1.5rem',
                            mb: '1rem',
                            backgroundColor: colors.greenAccent[500],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[600], // Set your desired hover color
                            },
                            fontSize: '1.2rem',
                            borderRadius: '0'
                        }}
                    >
                        Register
                    </Button> : <Box display='flex' justifyContent='center' alignItems='center'>
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color={colors.greenAccent[600]}
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </Box>}
                    <Box display='flex' flexDirection='row' justifyContent='center'>
                        <Typography fontSize='1.2rem' color={colors.greenAccent[200]}>
                            Already have an account?&nbsp;
                        </Typography>
                        <Typography fontSize='1.2rem' fontWeight="600" color={colors.greenAccent[500]} sx={{ cursor: 'pointer' }} onClick={handleNavigation}>
                            Log In
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' mt='1rem'>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{
                                mt: '0.3rem',
                                mb: '0.2rem',
                                backgroundColor: colors.redAccent[500],
                                "&:hover": {
                                    backgroundColor: colors.blackAccent[500], // Set your desired hover color
                                },
                                fontSize: '1.2rem',
                                borderRadius: '0',
                            }}
                            onClick={handleGoogleSignUp}
                        >
                            Signup with Google
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
