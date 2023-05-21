import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
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
        const toSend = {
            text: message,
            author: user.id,
            task: props.task,
            localDateTime: str
        };
        sendMessage(toSend).then(res => {
            setMessages([...messages, res.data])
        });
        setMessage("");
    }
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(props.messages)
    }, [props.messages])

    function profile(author) {
        nav("/profile/" + author);
    }

    return (
        <Box sx={{maxWidth: "600px", ml: "auto", mr: "auto", pb: 1, mb: 3}}>
            <TextField
                fullWidth
                value={message} onChange={(e) => setMessage(e.target.value)}
                InputProps={{
                    endAdornment: <IconButton onClick={send}>
                        <SendIcon/>
                    </IconButton>
                }}
            />
            {messages ? [...messages].reverse().map(mes => (
                <Box key={mes.id} maxWidth="600px" mt={1} mr={1}>
                    {user.id === mes.author ?
                        <Box boxShadow={2} borderRadius={5} sx={{display: "flex"}}>
                            <IconButton onClick={() => profile(mes.author)}><Avatar/></IconButton>
                            <Box mt={0.5} sx={{display: "flex"}} flexDirection={"column"}>
                                <Typography width="100%" sx={{
                                    color: "grey",
                                    fontSize: "0.8rem",
                                    display: "inline",
                                    textAlign: "left"
                                }} ml={1}
                                            mr="auto">{mes.localDateTime.replace("T", " ")}</Typography>

                                <Typography mr="auto" ml={1}>{mes.text}</Typography>
                            </Box>
                        </Box>
                        :
                        <Box boxShadow={2} borderRadius={5} ml="auto" flexDirection="row" sx={{display: "flex"}}>
                            <Box mt={0.5} ml="auto" sx={{display: "flex"}} flexDirection={"column"}>
                                <Typography sx={{color: "grey", fontSize: "0.8rem", display: "inline"}} ml="auto"
                                            mr={1}>{mes.localDateTime.replace("T", " ")}</Typography>
                                <Typography ml="auto" mr={1}>{mes.text}</Typography>
                            </Box>
                            <IconButton onClick={() => profile(mes.author)}><Avatar/></IconButton>
                        </Box>
                    }
                </Box>
            )) : <></>}

        </Box>
    );
}