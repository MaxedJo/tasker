import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import ReactQuill from "react-quill";

export default function TaskCreate(props) {
    const [title, setTitle] = useState(props.task ? props.task.title : '');
    const [description, setDescription] = useState(props.task ? props.task.description : '');
    const changeTitle = event => setTitle(event.target.value);
    const save = () => {
        props.onSave(
            props.task
                ? {
                    ...props.task,
                    title: title,
                    description: description,
                }
                : {
                    title: title,
                    description: description,
                    id: null,
                    project: props.projectId,
                    owner: JSON.parse(localStorage.getItem("user")).id,
                    status: 'OPENED',
                    user: null
                }
        );
        setTitle('');
        setDescription('');
    }
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>{props.task ? 'Редактирование задачи' : 'Новая задача'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{marginTop: '8px'}}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            label="Задача"
                            name="title"
                            autoComplete="title"
                            defaultValue={title}
                            onChange={changeTitle}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill theme="snow" value={description} onChange={setDescription}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Отменить</Button>
                <Button
                    variant="contained"
                    disabled={title === '' || description === ''}
                    onClick={save}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}