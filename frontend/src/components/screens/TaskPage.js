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
import {deleteFile, deleteTask, getFileList, getProjectByTask, getTaskHistory, getUserInfo} from "../../api/client";
import HistoryList from "../history/HistoryList";
import FileInput from "../ui/FileInput";
import FileList from "../files/FileList";
import dayjs from "dayjs";
import DeadLineMark from "../ui/DeadLineMark";
import StatusSwitcher from "../ui/StatusSwitcher";
import {Card} from "@mui/material";
import Link from "@mui/material/Link";

export default function TaskPage() {
    const load = useLoaderData();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [project, setProject] = useState({owner: {}});
    const [owner, setOwner] = useState({});
    const [edit, setEdit] = useState(true);
    const [history, setHistory] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [tab, setTab] = useState('1');
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
        getTaskHistory(task.id).then(r => {
            setHistory(r.data);
        });
        getFileList(task.id).then(r => {
            setFileList(r.data)
        });
        getProjectByTask(task.id).then(r => {
            setProject(r.data);
        });

    }, []);
    const handleEdit = () => {
        setEdit(false);
    }

    const appendFile = file => {
        console.log(file)
        setFileList([...fileList, {...file}])
    }
    const removeFile = id => {
        deleteFile(id).then(() => {
            setFileList(fileList.filter(file => file.id !== id));
        })
    }

    const handleDelete = () => {
        deleteTask(task.id)
            .then(() => {
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
                        <Typography m={3} variant="h3">{task.title}</Typography>
                        <StatusSwitcher task={task} owner={project.owner.id}/>
                        <Box
                            sx={{gap: 2}}
                            display="flex"
                        >
                            <Typography
                                margin="0"
                                component="div"
                                className="tmx-description"
                                sx={{flex: 1}}>{parse(task.description)}</Typography>
                            <Card
                                sx={{
                                    width: '200px', flexGrow: 0,
                                    position: 'relative',
                                    padding: 1, display: 'flex', flexDirection: 'column', gap: 2
                                }}
                            >
                                <Box>
                                    <Typography>Статус: {fixStatus(task.status)}</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Срок исполнения
                                    </Typography>
                                    <Typography component="div" sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 1

                                    }}>
                                        <DeadLineMark task={task}/>
                                        {!task.deadline ? 'без срока' :
                                            dayjs(task.deadline).format('DD.MM.YYYY')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Постановщик
                                    </Typography>
                                    <Typography component="div">
                                        <Link href={"/profile/" + owner.id}>{owner.fio}</Link>
                                    </Typography>
                                </Box>
                                {user ? <Box>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Исполнитель
                                    </Typography>
                                    <Typography component="div">
                                        <Link href={"/profile/" + user.id}>{user.fio}</Link>
                                    </Typography>
                                </Box> : ''}
                            </Card>

                        </Box>
                        {validateUser([task.owner, task.member, project.owner.id], <Button
                            onClick={handleEdit}>Редактировать</Button>)}
                        {validateUser([task.owner, project.owner.id], <Button onClick={handleDelete}>Удалить</Button>)}
                        <TabContext value={tab}>
                            <Box ml="auto" mr="auto" maxWidth="50vh" sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleTabChange}>
                                    <Tab label="Обсуждение" value="1"/>
                                    <Tab label="История изменений" value="2"/>
                                    <Tab label="Файлы" value="3"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1"><Chat task={task.id} messages={task.messages}/></TabPanel>
                            <TabPanel value="2">
                                <HistoryList items={history}/>
                            </TabPanel>
                            <TabPanel value="3">
                                <FileInput
                                    max
                                    onUpload={appendFile}
                                    taskId={task.id}
                                    label="Загрузка файла"
                                    error={false}
                                />
                                <FileList
                                    removeFile={removeFile}
                                    items={fileList}
                                />
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