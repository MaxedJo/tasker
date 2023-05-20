import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function NotAllowed() {
    const navigate = useNavigate();
    useEffect(() => {
        if (document.documentURI.endsWith("profile")) {
            localStorage.removeItem("user");
            navigate("/")
        }
    }, []);
    return (
        <Box m="auto" position="absolute">
            <Typography maxWidth="70vh" variant="h3">У вас недостаточно прав для просмотра данной страницы</Typography>
        </Box>
    );
}