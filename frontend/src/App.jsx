import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "./assets/App.css";
import LoginPage from "./components/screens/LoginPage";
import Home from "./components/Home";
import Task from "./components/Task";
import Wrapper from "./components/Wrapper";
import RegistrationPage from "./components/screens/RegistrationPage";
import ProfilePage from "./components/screens/ProfilePage";
import {CircularProgress} from "@mui/material";
import ProjectsListPage from "./components/screens/ProjectsListPage";
import ProjectPage from "./components/screens/ProjectPage";
import axios from "axios";
import authToken from "./authToken";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Wrapper/>,
        children: [
            {path: "/", element: <Task/>},
            {path: "/home", element: <Home/>},
            {path: "/projects", element: <ProjectsListPage/>},
            {
                path: "/projects/:projectId", element: <ProjectPage/>, loader: async ({params}) => {
                    return        axios
                        .get(`http://localhost:8080/project/${params.projectId}`, {headers: authToken()});
                },
            },
            {path: "/login", element: <LoginPage/>},
            {path: "/register", element: <RegistrationPage/>},
            {path: "/profile", element: <ProfilePage/>},
            {path: "/*", element: <CircularProgress/>},
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
}
export default App;
