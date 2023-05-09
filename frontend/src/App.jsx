import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "./assets/App.css";
import LoginPage from "./components/screens/LoginPage";
import Home from "./components/Home";
import Profile from "./components/screens/Profile";
import Task from "./components/Task";
import Wrapper from "./components/Wrapper";
import RegistrationPage from "./components/screens/RegistrationPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Wrapper/>,
        children: [
            {path: "/", element: <Task/>},
            {path: "/home", element: <Home/>},
            {path: "/login", element: <LoginPage/>},
            {path: "/register", element: <RegistrationPage/>},
            {path: "/profile", element: <Profile/>}
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
}
export default App;
