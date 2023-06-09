import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../../api/client";

export default function ProfileForm(props) {

    let nav = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userFromData = {
            fio: data.get("fio"),
            username: data.get("username"),
            profession: data.get("profession"),

        }
        updateUser(userFromData).then(() => {
            nav("/login");
        })
    }
    return (
        <Box component="form"
             sx={{
                 '& > :not(style)': {m: 1, maxWidth: '90ch'},
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
             }}
             onSubmit={handleSubmit}
             autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="Имя пользователя"
                        name="username"
                        autoComplete="username"
                        value={props.userData.username}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="given-fio"
                        name="fio"
                        required
                        fullWidth
                        id="fio"
                        label="ФИО"
                        defaultValue={props.userData.fio}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="given-profession"
                        name="profession"
                        fullWidth
                        id="profession"
                        label="Должность"
                        defaultValue={props.userData.profession}
                        autoFocus
                    />
                </Grid>
            </Grid>
            <Button sx={{mt: 4}} variant="contained" type="submit">Сохранить</Button>
        </Box>
    );
}