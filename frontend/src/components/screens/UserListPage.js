import {Box} from "@mui/material";
import {Navigate, useLoaderData} from "react-router-dom";
import Typography from "@mui/material/Typography";
import UsersList from "../users/UsersList";
import React from "react";

export default function UserListPage() {
    const load = useLoaderData();
    const data = load.data;
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login"/>;
    }
    return (
        <Box pt={10}>
            <Typography mb={5} variant="h5">Все пользователи</Typography>
            <UsersList items={data}/>
        </Box>
    );
}