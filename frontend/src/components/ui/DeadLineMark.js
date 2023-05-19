import WarningIcon from '@mui/icons-material/Warning';
import {red} from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import dayjs from "dayjs";

export default function DeadLineMark(props) {

    return (
        <>
            {dayjs(props.task.deadline).isBefore(dayjs()) && props.task.status !== 'CLOSED' && props.task.status !== 'ARCHIVED' ?
                <Tooltip title="Задача просрочена">
                    <WarningIcon sx={{color: red[500]}}/>
                </Tooltip> : <></>

            }
        </>

    )

}