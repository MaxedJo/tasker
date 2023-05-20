import * as React from 'react';
import TasksList from "./TasksList";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function ProjectTasksList(props) {

    return (
        <>
            <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
                sx={{m: 2}}
            >
                <Button
                    startIcon={<AddIcon/>}
                    size="small"
                    href={"/projects/" + props.projectId + "/task"}>Создать Задачу</Button>
            </ButtonGroup>
            <TasksList items={props.items}/>
        </>
    );
}