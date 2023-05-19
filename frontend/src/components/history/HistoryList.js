import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {fixStatus} from "../../utility";

const fieldName = {
    'NONE': 'Создание задачи',
    'TITLE': 'Название задачи',
    'DESCRIPTION': 'Описание',
    'USER': 'Ответственный',
    'FILE_DELETE': "Удален файл",
    'FILE_ADD': 'Добавлен файл',
    'DEADLINE': 'Срок выполнения',
    'STATUS': "Статус",
}
const columns = [
    {id: 'changeTime', label: 'Дата', minWidth: 170},
    {id: 'user', label: 'Пользователь', minWidth: 100},
    {id: 'field', label: 'Поле', minWidth: 170,},
    {id: 'changes', label: 'Изменения', minWidth: 170,},
];
export default function HistoryList(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const parseChanges = (from, to, field) => {
        let res = [];
        if (from) {
            res.push(field === 'STATUS' ? fixStatus(from) : from);
        }
        if (to) {
            res.push(field === 'STATUS' ? fixStatus(to) : to);
        }
        return res.join(' → ');
    }
    const rows = props.items.map(item => ({
        id: item.id,
        changeTime: (new Date(item.changeTime,)).toLocaleString(),
        user: item.username,
        field: fieldName.hasOwnProperty(item.field) ? fieldName[item.field] : 'Общие',
        changes: parseChanges(item.oldValue, item.newValue, item.field),
    }));

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function defaultLabelDisplayedRows({from, to, count}) {
        return `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`;
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
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