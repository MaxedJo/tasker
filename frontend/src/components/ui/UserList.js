import {Button, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import authToken from "../../authToken";
import Typography from "@mui/material/Typography";

export default function UserList(props) {
    const [users, setUsers] = useState([]);
    const buildSecondary = (user) => {
        let str = user.username;
        str += user.profession
            ? "  " + user.profession
            : "";
        return str;
    }
    const s = new Set(props.users.map(e => e.id));
    useEffect(() => {
        axios.get("http://localhost:8080/user-api/user/all", {headers: authToken()})
            .then(r => {
                setUsers(r.data.filter(e => !s.has(e.id)))
            })
    }, []);
    const submit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios
            .post(`http://localhost:8080/project/${props.project}/add-user`,
                {id: data.get("users")},
                {headers: authToken()}
            ).then(r => {
            window.location.reload();
        })
        console.log(data.get("users"));
    }
    return (
        <Box>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    ml: "auto",
                    mr: "auto",
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': {padding: 0},
                }}
            >
                {
                    props.users.map(user => (
                        <ListItem key={`item-${user.id}`}>
                            <ListItemButton href={"/profile/" + user.id}>
                                <ListItemText primary={user.fio} secondary={buildSecondary(user)}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            {props.create ?
                <Box component="form" onSubmit={submit}>
                    <Grid container direction="column"
                          justifyContent="center"
                          alignItems="center">
                        <Grid item>
                            <TextField
                                id="users"
                                select
                                name="users"
                                defaultValue=""
                                label="Добавление участников"
                                helperText="Выберите пользователя"
                            >
                                {users.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        <Typography
                                            variant="h7">{option.fio} {option.username} {option.profession}</Typography>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <Button type="submit">Сохранить</Button>
                        </Grid>
                    </Grid>
                </Box>
                : <></>

            }
        </Box>
    );
}