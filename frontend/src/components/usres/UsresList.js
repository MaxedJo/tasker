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
import Link from "@mui/material/Link";
import {validateUser} from "../../utility";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const columnsDefault = [
    {id: 'username', label: 'Пользователь', minWidth: 170},
    {id: 'fio', label: 'ФИО', minWidth: 170},
    {id: 'profession', label: 'Должность', minWidth: 170}
];
export default function UsersList(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    let columns = props.canDelete
        ? [...columnsDefault, {id: 'delete', label: 'ss', width: 70}]
        : columnsDefault;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function defaultLabelDisplayedRows({from, to, count}) {
        return `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`;
    }

    useEffect(() => {
        setRows(props.items.map(item => ({
            ...item,
            username: <Link href={'/profile/' + item.id}>{item.username}</Link>,
            delete:
                props.ownerId !== item.id
                    ? validateUser(props.ownerId,
                        <IconButton aria-label="delete"
                                    onClick={() => props.onDelete(item.id)}>
                            <DeleteIcon/>
                        </IconButton>)
                    : <></>
        })));

    }, [props.items])
    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            {props.items.length > 0 ?
                (<><TableContainer sx={{maxHeight: 440}}>
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
                </>)
                : 'Нет пользователей'}
        </Paper>
    );
}