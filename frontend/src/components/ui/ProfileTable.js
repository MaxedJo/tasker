import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import React from "react";

export default function ProfileTable(props) {
    console.log(props)
    return (
        <TableContainer component={Paper} sx={{maxWidth: 650, mt: 5, ml: "auto", mr: "auto"}}>
        <Table sx={{minWidth: "30%"}} aria-label="simple table">
            <TableBody>
                {props.userData.map((row) => (
                    <TableRow
                        key={row}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            {row.key}
                        </TableCell>
                        <TableCell  align={row.align}>
                            {row.value}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
}