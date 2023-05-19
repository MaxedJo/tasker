import NavAppBar from "./ui/NavAppBar";
import {Outlet} from "react-router-dom";
import Footer from "./ui/Footer";
import {Box} from "@mui/material";
import Container from "@mui/material/Container";

function Wrapper() {
    return (
        <Box className="App" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <NavAppBar/>
            <Container>
                <Outlet/>
            </Container>
            <Footer/>
        </Box>
    )
}

export default Wrapper