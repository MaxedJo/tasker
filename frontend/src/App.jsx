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
import TasksListPage from "./components/screens/TasksListPage";
import TaskPage from "./components/screens/TaskPage";
import UserListPage from "./components/screens/UserListPage";


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
                    return axios
                        .get(`http://localhost:8080/project/${params.projectId}`, {headers: authToken()});
                },
            },
            {path: "/login", element: <LoginPage/>},
            {path: "/tasks", element: <TasksListPage/>},
            {
                path: "/tasks/:taskId", element: <TaskPage/>, loader: async ({params}) => {
                    return axios
                        .get(`http://localhost:8080/task/${params.taskId}`, {headers: authToken()});
                },
            },
            {
                path: "/users", element: <UserListPage/>, loader: async () => {
                    return axios
                        .get(`http://localhost:8080/user-api/user/all`, {headers: authToken()});
                },
            },
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
