import React, { useEffect, useState } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Paper,
    Typography,
} from "@mui/material";
import { fetchUsers } from "../../../service";
import { StyledUsers } from "./style";
const columns = [
    {
        id: "fullName",
        label: "Full name",
    },
    {
        id: "email",
        label: "Email",
    },
    {
        id: "role",
        label: "Role",
    },
];
interface IUser {
    id?: string;
    email?: string;
    fullName?: string;
    role?: string;
}
const Users = () => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(8);
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>([])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);


    const getUsers = async () => {
        setLoading(true)
        const users = await fetchUsers()
        if (users) {
            setUsers(users)
            setLoading(false)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <StyledUsers>
            {

                loading ? <Typography>Loading...</Typography> : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>{column.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.fullName}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                        </TableRow>
                                    ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={3} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[2, 5, 10]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                )
            }
        </StyledUsers>
    );
};

export default Users;
