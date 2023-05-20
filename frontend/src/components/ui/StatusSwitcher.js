import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import {validateUser} from "../../utility";
import {updateTask} from "../../api/client";


export default function StatusSwitcher(props) {
    function generateButtons(status) {
        switch (status) {
            case 'OPENED':
                return <Button key={0} onClick={() => changeStatus('WORKING')}>В работу</Button>
            case 'WORKING':
                return [<Button key={0} onClick={() => changeStatus('OPENED')}>Необходимо уточнение</Button>,
                    <Button key={1} onClick={() => changeStatus('TESTING')}>На тестирование</Button>]
            case 'TESTING':
                return [<Button key={0} onClick={() => changeStatus('WORKING')}>На доработку</Button>,
                    <Button key={1} onClick={() => changeStatus('CLOSED')}>Завершить</Button>]
        }
    }

    const changeStatus = (status) => {
        let toSend = props.task;
        toSend.status = status;
        updateTask(toSend);
        window.location.reload();
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup variant="text" aria-label="text button group">
                {generateButtons(props.task.status)}
                {props.task.status !== 'ARCHIVED' ?
                    validateUser([props.owner],
                        <Button key={2} onClick={() => changeStatus('ARCHIVED')}>В архив</Button>) : <></>}
            </ButtonGroup>
        </Box>
    );
}