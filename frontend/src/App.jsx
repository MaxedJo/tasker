import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "./assets/App.css";
import LoginPage from "./components/screens/LoginPage";
import Wrapper from "./components/Wrapper";
import RegistrationPage from "./components/screens/RegistrationPage";
import ProfilePage from "./components/screens/ProfilePage";
import ProjectsListPage from "./components/screens/ProjectsListPage";
import ProjectPage from "./components/screens/ProjectPage";
import TasksListPage from "./components/screens/TasksListPage";
import TaskPage from "./components/screens/TaskPage";
import UserListPage from "./components/screens/UserListPage";
import NotAllowed from "./components/ui/NotAllowed";
import CreateProject from "./components/screens/CreateProject";
import CreateTask from "./components/screens/CreateTask";
import {getProjectInfo, getTask, getUserCurrent, getUserInfo, getUserList} from "./api/client";


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
                    return getProjectInfo(params.projectId);
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
                path: "/tasks/:taskId", element: <TaskPage/>, loader: async ({params}) => getTask(params.taskId),
            },
            {path: "/users", element: <UserListPage/>, loader: async () => getUserList()},
            {path: "/register", element: <RegistrationPage/>},
            {path: "/profile", element: <ProfilePage/>, loader: async () => getUserCurrent()},
            {path: "/profile/:userId", element: <ProfilePage/>, loader: async ({params}) => getUserInfo(params.userId)},
            {path: "/*", element: <ProfilePage/>},
        ],
        errorElement: <NotAllowed/>,
    }
])

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
}
export default App;
