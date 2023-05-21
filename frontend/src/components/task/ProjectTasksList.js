import * as React from 'react';
import {useEffect} from 'react';
import TasksList from "./TasksList";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TaskCreate from "./TaskCreate";
import {addTask} from "../../api/client";
import Toolbar from "@mui/material/Toolbar";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function ProjectTasksList(props) {
    const [open, setOpen] = React.useState(false);
    const [tasks, setTasks] = React.useState(props.items);
    const [filteredTask, setFilteredTask] = React.useState([]);
    const [showClosed, setShowClosed] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        setFilteredTask(
            tasks
                .filter(item => showClosed || (!showClosed && item.status !== 'CLOSED'))
                .sort((itemA, itemB) => {
                    if (itemA.deadline === itemB.deadline) {
                        return 0;
                    }
                    return itemA.deadline > itemB.deadline ? 1 : -1;
                })
        );
    }, [showClosed, tasks])

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = task => {
        addTask(task).then(r => {
            setTasks([
                ...tasks,
                {...r.data}
            ]);
        });
        setOpen(false);
    }
    const toggleChecked = () => {
        setShowClosed((prev) => !prev);
    };
    return (
        <>
            <Toolbar sx={{
                display: 'flex',
                gap: 4
            }}>
                <Button
                    startIcon={<AddIcon/>}
                    onClick={handleClickOpen}>
                    Поставить задачу
                </Button>
                <FormControlLabel
                    control={<Switch size="small" checked={showClosed} onChange={toggleChecked}/>}
                    label="Завершенные"
                />
            </Toolbar>
            <TasksList items={filteredTask}/>
            <TaskCreate
                open={open}
                onClose={handleClose}
                projectId={props.projectId}
                onSave={handleAdd}
            />
        </>
    );
}