import {Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import {sendMessage} from "../../api/client";

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
        sendMessage({
            text: message,
            author: user.id,
            task: props.task,
            localDateTime: str
        });
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
                        <Box flexDirection="row" sx={{display: "flex"}}>
                            <IconButton onClick={() => profile(mes.author)}><Avatar/></IconButton>
                            <Box mt={0.5}>
                                <Typography sx={{color: "grey", fontSize: "0.8rem", display: "inline"}} ml="auto"
                                            mr={1}>{mes.localDateTime.replace("T", " ")}</Typography>

                                <Typography mr="auto" ml={1}>{mes.text}</Typography>
                            </Box>
                        </Box>
                        :
                        <Box right={0} flexDirection="row" sx={{display: "flex"}}>
                            <Box mt={0.5} ml="auto">
                                <Typography sx={{color: "grey", fontSize: "0.8rem", display: "inline"}} ml="auto"
                                            mr={1}>{mes.localDateTime.replace("T", " ")}</Typography>
                                <Typography ml="auto" mr={1} mt={2}>{mes.text}</Typography>
                            </Box>
                            <IconButton onClick={() => profile(mes.author)}><Avatar/></IconButton>
                        </Box>
                    }
                </Box>
            )) : <></>}

        </Paper>
    );
}