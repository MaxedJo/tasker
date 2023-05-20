import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Navigate, useNavigate} from "react-router-dom";
import AuthService from "../../auth/AuthService";
import ErrorDialog from "../ui/ErrorDialog";

const theme = createTheme();

export default function LoginPage() {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        AuthService.login(data.get('username'), data.get('password'))
            .then(() => {
                setErrorMessage('Неверные пароль или логин');
                //navigate("/profile");
            });

    };

    if (localStorage.getItem("user")) {
        return <Navigate to="/profile"/>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Вход
                        </Button>
                        <Link href={"/register"} variant="body2">
                            {"Еще нет аккаунта? Регистрация"}
                        </Link>
                    </Box>
                </Box>
            </Container>
            <ErrorDialog message={errorMessage} onClose={() => setErrorMessage('')}/>
        </ThemeProvider>
    );
}