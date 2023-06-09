import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Navigate, useNavigate} from "react-router-dom";
import AuthService from "../../auth/AuthService";
import ErrorDialog from "../ui/ErrorDialog";

const theme = createTheme();

export default function RegistrationPage() {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        AuthService.register(data.get("username"), data.get("fio"), data.get("password"))
            .then(() => {
                navigate("/tasks");
            }).catch(r => {
            setErrorMessage(r.response.data === '' ? 'Ошибка регистрации' : r.response.data);
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
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-fio"
                                    name="fio"
                                    required
                                    fullWidth
                                    id="fio"
                                    label="ФИО"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Имя пользователя"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
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
                            sx={{mt: 3, mb: 2}}
                        >
                            Регистрация
                        </Button>
                        <Link href="/login" variant="body2">
                            Уже есть аккаунт? Войти
                        </Link>
                    </Box>
                </Box>
            </Container>
            <ErrorDialog message={errorMessage} onClose={() => setErrorMessage('')}/>
        </ThemeProvider>
    );
}