import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "@mui/material/Link";

const columns = [
    {id: 'fileName', label: 'Файл', minWidth: 170},
    {id: 'delete', label: '', width: 70, align: 'right'},
];
export default function FileList(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const rows = props.items.map(item => ({
        ...item,
        fileName: <Link
            href={process.env.REACT_APP_BACKEND_HOST + '/files/files/' + item.fileId}>{item.fileName}</Link>,
        delete: <IconButton aria-label="delete" onClick={() => props.removeFile(item.fileId)}>
            <DeleteIcon/></IconButton>
    }));

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', margin: '0 0 40px'}}>
            {props.items.length > 0 ?
                (<><TableContainer>
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
                : 'Нет прикрепленных файлов'}
        </Paper>
    );
}