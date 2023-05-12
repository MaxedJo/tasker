import {useLoaderData} from "react-router-dom";
import Box from "@mui/material/Box";

export default function TaskPage() {
    const load = useLoaderData();
    const data = load.data;
    // data.map(task=>(
    //
    // ));
    return (
        <Box>
            {JSON.stringify(data)}
        </Box>
    );
}