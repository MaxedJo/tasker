import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import NavAppBar from "./NavAppBar";
import Footer from "./Footer";

export default function NotAllowed() {
    const navigate = useNavigate();
    useEffect(() => {
        if (document.documentURI.endsWith("profile")) {
            localStorage.removeItem("user");
            navigate("/")
        }
    }, []);
    return (
        <Box className="App" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'center'
        }}>
            <NavAppBar/>
            <Typography m="auto" variant={"h2"}>Нет доступа</Typography>
            <Footer/>
        </Box>
    );
}