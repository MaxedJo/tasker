import {useLoaderData} from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import authToken from "../../authToken";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {fixStatus, validateUser} from "../../utility";
import Button from "@mui/material/Button";

export default function TaskPage() {
    const load = useLoaderData();
    const [user, setUser] = useState({});
    const [owner, setOwner] = useState({});
    let task = load.data;
    useEffect(() => {
        axios.get("http://localhost:8080/user-api/user/" + task.owner, {headers: authToken()})
            .then(r => {
                setOwner(r.data);
            });
        if (task.user != null) axios.get("http://localhost:8080/user-api/user/" + task.user, {headers: authToken()})
            .then(r => {
                setUser(r.data);
            });
    }, [])
    return (
        <Box>
            <Typography m={3} variant="h4">{task.title}</Typography>
            <Typography mb={2}>Описание: {task.description}</Typography>
            <Button sx={{color: "black"}} href={"/profile/" + owner.id}>Создатель: {owner ? owner.fio : null}</Button>
            <Typography/>
            <Button sx={{color: "black"}} href={"/profile/" + user.id}>Исполнитель: {user ? user.fio : null}</Button>
            <Typography>Статус: {fixStatus(task.status)}</Typography>
            {validateUser(task.owner, <Button>Редактировать</Button>)}
        </Box>
    );
}