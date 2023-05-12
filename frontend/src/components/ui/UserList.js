import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import authToken from "../../authToken";

export default function UserList(props) {
    const [users, setUsers] = useState([]);
    const buildSecondary = (user) => {
        let str = user.username;
        str += user.profession
            ? "  " + user.profession
            : "";
        return str;
    }
    // const s = new Set(props.users.map(e => JSON.stringify(e)));
    useEffect(() => {
        axios.get("http://localhost:8080/user-api/user/all", {headers: authToken()})
            .then(r => {
                // setUsers(r.data.filter(e => !s.has(JSON.stringify(e))))
            })
    }, []);
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
                <TextField
                    id="users"
                    select
                    label="Select"
                    helperText="Выберите пользователя"
                >
                    {users.map((option) => (
                        <MenuItem key={option.id} value={option.fio}>
                            {option.username}
                        </MenuItem>
                    ))}
                </TextField>
                : <></>
            }
        </Box>
    );
}