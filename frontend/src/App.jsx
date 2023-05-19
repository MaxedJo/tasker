import React from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import "./assets/App.css";
import LoginPage from "./components/screens/LoginPage";
import Wrapper from "./components/Wrapper";
import RegistrationPage from "./components/screens/RegistrationPage";
import ProfilePage from "./components/screens/ProfilePage";
import ProjectsListPage from "./components/screens/ProjectsListPage";
import ProjectPage from "./components/screens/ProjectPage";
import axios from "axios";
import authToken from "./authToken";
import TasksListPage from "./components/screens/TasksListPage";
import TaskPage from "./components/screens/TaskPage";
import UserListPage from "./components/screens/UserListPage";
import NotAllowed from "./components/ui/NotAllowed";
import CreateProject from "./components/screens/CreateProject";
import CreateTask from "./components/screens/CreateTask";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Wrapper/>,
        children: [
            {path: "/", element: <LoginPage/>},
            {path: "/projects", element: <ProjectsListPage/>},
            {path: "/projects/create", element: <CreateProject/>},
            {
                path: "/projects/:projectId", element: <ProjectPage/>, loader: async ({params}) => {
                    return axios
                        .get(`http://localhost:8080/project/${params.projectId}`, {headers: authToken()});
                },
                children: [{
                    path: "/projects/:projectId/task",
                    element: <CreateTask/>,
                    loader: async ({params}) => {
                        return params.projectId
                    },

                }]
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
            {
                path: "/profile", element: <ProfilePage/>, loader: async ({params}) => {
                    return axios
                        .get(`http://localhost:8080/user-api/user`, {headers: authToken()});
                },
            },
            {
                path: "/profile/:userId", element: <ProfilePage/>, loader: async ({params}) => {
                    return axios
                        .get(`http://localhost:8080/user-api/user/${params.userId}`, {headers: authToken()});
                },
            },
            {path: "/*", element: <NotAllowed/>},
        ],
        errorElement: <Navigate to={"/login"}/>
    }
])

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
}
export default App;
