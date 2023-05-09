import NavAppBar from "./ui/NavAppBar";
import {Outlet} from "react-router-dom";

function Wrapper() {
    return (
        <div className="App">
            <NavAppBar/>
            <Outlet/>
        </div>
    )
}

export default Wrapper