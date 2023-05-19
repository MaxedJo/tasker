import {Navigate, useLoaderData, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import authToken from "../../authToken";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {fixStatus, validateUser} from "../../utility";
import Button from "@mui/material/Button";
import TaskForm from "../ui/TaskForm";
import Chat from "../ui/Chat";
import parse from 'html-react-parser';
import './assets/TaskPage.css';
import {deleteTask, getUserInfo} from "../../api/client";

export default function TaskPage() {
    const load = useLoaderData();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [owner, setOwner] = useState({});
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        getUserInfo(task.owner).then(r => {
            setOwner(r.data);
        });
        if (task.user != null) {
            getUserInfo(task.user).then(r => {
                setUser(r.data);
            });
        }
        axios.get("http://localhost:8080/changes/"
            + task.id, {headers: authToken()})
            .then(r => {
                console.log(r.data);
            });
    }, []);
    const handleEdit = () => {
        setEdit(false);
    }
    const handleDelete = () => {

        deleteTask(task.id)
            .then(r => {
                navigate(-1);
            });
    }
    let task = load.data;

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
                        <Typography m={3} variant="h6">Описание</Typography>
                        <Typography sx={{whiteSpace: 'pre-line'}} ml="auto" mr="auto" maxWidth={800}
                                    className="tmx-description"
                                    mb={2}>{parse(task.description)}</Typography>
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