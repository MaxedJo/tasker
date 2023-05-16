import {Navigate, useLoaderData, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import authToken from "../../authToken";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {fixStatus, validateUser} from "../../utility";
import Button from "@mui/material/Button";
import TaskForm from "../ui/TaskForm";
import Chat from "../ui/Chat";

export default function TaskPage() {
    const load = useLoaderData();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [owner, setOwner] = useState({});
    const [edit, setEdit] = useState(true);
    const handleEdit = () => {
        setEdit(false);
    }
    const handleDelete = () => {
        axios.get("http://localhost:8080/task/" + task.id + "/delete", {headers: authToken()})
            .then(r => {
                navigate(-1);
            });
    }
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
    }, []);
    if (!load.data.id) {
        return <Navigate to={"/tasks/"}/>
    }


    return (
        <>
            {edit
                ?
                <>
                    <Box>
                        <Typography m={3} variant="h4">{task.title}</Typography>
                        <Typography sx={{whiteSpace: 'pre-line'}} ml="auto" mr="auto" maxWidth={800}
                                    mb={2}>Описание: {task.description}</Typography>
                        <Button sx={{color: "black"}}
                                href={"/profile/" + owner.id}>Создатель: {owner ? owner.fio : null}</Button>
                        <Typography/>
                        <Button sx={{color: "black"}}
                                href={"/profile/" + user.id}>Исполнитель: {user ? user.fio : null}</Button>
                        <Typography>Статус: {fixStatus(task.status)}</Typography>
                        {validateUser(task.owner, <Button
                            onClick={handleEdit}>Редактировать</Button>, validateUser(task.member, <Button
                            onClick={handleEdit}>Редактировать</Button>))}
                        {validateUser(task.owner, <Button onClick={handleDelete}>Удалить</Button>)}
                        <Typography variant="h4" mb={3} mt={2}>Обсуждение</Typography>
                        <Chat task={task.id} messages={task.messages}/>
                    </Box>
                </>
                :
                <TaskForm task={task}/>

            }
        </>

    );
}