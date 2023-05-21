import * as React from 'react';
import {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {fixStatus, getStatusColor} from "../../utility";
import {Link} from "react-router-dom";
import {getUserList} from "../../api/client";
import DeadLineMark from "../ui/DeadLineMark";
import Box from "@mui/material/Box";

const columns = [
    {id: 'mark', label: '', minWidth: 0, align: 'left'},
    {id: 'title', label: 'Задача', minWidth: 170},
    {id: 'status', label: 'Статус', minWidth: 100},
    {id: 'deadline', label: 'Срок', minWidth: 100},
    {id: 'user', label: 'Исполнитель', minWidth: 100},
    {id: 'owner', label: 'Постановщик', minWidth: 100},
];
export default function TasksList(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [userList, setUserList] = React.useState({});

    useEffect(() => {
        getUserList().then(r => {
            let i = 0, c = r.data.length, list = {};
            for (; i < c; ++i) {
                list[r.data[i].id] = r.data[i];
            }
            setUserList(list);
        })
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const rows = props.items.map(item => ({
        ...item,
        title: <Link to={"/tasks/" + item.id}>{item.title}</Link>,
        status: fixStatus(item.status),
        owner: (userList.hasOwnProperty(item.owner) ?
            <Link to={"/profile/" + item.owner}>{userList[item.owner].fio}</Link>
            : 'Неизвестный'),
        user: (userList.hasOwnProperty(item.user) ?
            <Link to={"/profile/" + item.owner}>{userList[item.user].fio}</Link>
            : ''),
        mark: <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box
                sx={{
                    display: "block",
                    width: '16px',
                    height: '16px',
                    borderRadius: '8px',
                    backgroundColor: getStatusColor(item.status)
                }}/>
            <DeadLineMark task={item}/>
        </Box>
    }));

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function defaultLabelDisplayedRows({from, to, count}) {
        return `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`;
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', margin: '0 0 40px'}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelDisplayedRows={defaultLabelDisplayedRows}
                labelRowsPerPage="Записей на страницу"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}