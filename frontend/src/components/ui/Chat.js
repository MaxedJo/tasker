import {Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import authToken from "../../authToken";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";

export default function Chat(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const nav = useNavigate();
    const fix = (str) => {
        if (str.length === 1) return "0" + str;
        return str;
    }
    const send = () => {
        const date = new Date();
        let str = date.getFullYear() + "-" + fix(date.getMonth().toString()) + "-" + date.getDate() + "T" + date.toLocaleTimeString()
        axios.post("http://localhost:8080/message/send", {
            text: message,
            author: user.id,
            task: props.task,
            localDateTime: str
        }, {headers: authToken()})
        setMessage("");
        window.location.reload()
    }
    const [message, setMessage] = useState("");

    function profile(author) {
        nav("/profile/" + author);
    }

    return (
        <Paper elevation={5} sx={{maxWidth: "80vh", ml: "auto", mr: "auto", pb: 1, mb: 3}}>
            <TextField
                fullWidth
                value={message} onChange={(e) => setMessage(e.target.value)}
                InputProps={{
                    endAdornment: <IconButton onClick={send}>
                        <SendIcon/>
                    </IconButton>
                }}
            />
            {props.messages ? [...props.messages].reverse().map(mes => (
                <Box key={mes.id} maxWidth="100vh" mt={1} mr={1} display="flex">
                    {user.id === mes.author ?
                        <>
                            <IconButton onClick={() => profile(mes.author)}><Avatar/></IconButton>
                            <Typography mr="auto" ml={1} mt={2}>{mes.text}</Typography>
                        </>
                        :
                        <>
                            <Typography ml="auto" mr={1} mt={2}>{mes.text}</Typography>
                            <IconButton onClick={() => profile(mes.author)}><Avatar/></IconButton>
                        </>}

                </Box>
            )) : <></>}

        </Paper>
    );
}