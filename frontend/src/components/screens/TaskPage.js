import {Navigate, useLoaderData, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {fixStatus, validateUser} from "../../utility";
import Button from "@mui/material/Button";
import TaskForm from "../ui/TaskForm";
import Chat from "../ui/Chat";
import parse from 'html-react-parser';
import './assets/TaskPage.css';
import {deleteTask, getTaskHistory, getUserInfo} from "../../api/client";
import HistoryList from "../history/HistoryList";

export default function TaskPage() {
    const load = useLoaderData();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [owner, setOwner] = useState({});
    const [edit, setEdit] = useState(true);
    const [tab, setTab] = useState('1');
    const [history, setHistory] = useState([]);
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };
    useEffect(() => {
        getUserInfo(task.owner).then(r => {
            setOwner(r.data);
        });
        if (task.user != null) {
            getUserInfo(task.user).then(r => {
                setUser(r.data);
            });
        }
        getTaskHistory(task.id)
            .then(r => {
                setHistory(r.data);
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
                        <TabContext value={tab}>
                            <Box ml="auto" mr="auto" maxWidth="50vh" sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleTabChange}>
                                    <Tab label="Обсуждение" value="1"/>
                                    <Tab label="История изменений" value="2"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1"><Chat task={task.id} messages={task.messages}/></TabPanel>
                            <TabPanel value="2">
                                <HistoryList items={history}/>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </>
                :
                <TaskForm task={task}/>

            }
        </>

    );
}