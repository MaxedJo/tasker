import {Box} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import Typography from "@mui/material/Typography";
import UsersList from "../usres/UsresList";

export default function UserListPage() {
    const load = useLoaderData();
    const data = load.data;
    return (
        <Box pt={10}>
            <Typography mb={5} variant="h5">Все пользователи</Typography>
            <UsersList items={data}/>
        </Box>
    );
}