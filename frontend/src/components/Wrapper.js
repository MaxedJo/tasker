import NavAppBar from "./ui/NavAppBar";
import {Outlet} from "react-router-dom";
import Footer from "./ui/Footer";
import {Box} from "@mui/material";

function Wrapper() {
    return (
        <Box className="App" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <NavAppBar/>
            <Outlet/>
            <Footer/>
        </Box>
    )
}

export default Wrapper