import axios from "axios";
import authToken from "../authToken";

const host = process.env.REACT_APP_BACKEND_HOST;
export const getUserInfo = (userId) => axios.get(host + "/user-api/user/"
    + userId, {headers: authToken()});

export const getUserCurrent = () => axios.get(
    host + "/user-api/user",
    {headers: authToken()}
);

export const getUserList = () => axios.get(
    host + "/user-api/user/all",
    {headers: authToken()}
);
export const updateUser = (data) => axios.post(
    host + "/user-api/user/edit",
    data,
    {headers: authToken()}
);

export const deleteTask = (taskId) => axios.get(
    host + "/task/" + taskId + '/delete',
    {headers: authToken()}
);
export const getStatuses = (taskId) => axios.get(
    host + "/task/" + taskId + '/statuses',
    {headers: authToken()}
);
export const getTaskCreated = () => axios.get(
    host + "/user-api/created-tasks",
    {headers: authToken()}
);
export const getTaskAssigned = () => axios.get(
    host + "/user-api/assigned-tasks",
    {headers: authToken()}
);

export const updateTask = data => axios.post(
    host + "/task/edit",
    data,
    {headers: authToken()}
);

export const getTask = (id) => axios.get(
    host + "/task/" + id,
    {headers: authToken()}
);
export const addTask = (data) => axios.post(
    host + "/task/add",
    data,
    {headers: authToken()}
);

export const getProjectList = () => axios.get(
    host + "/project/all",
    {headers: authToken()}
);
export const getProjectInfo = (id) => axios.get(
    host + "/project/" + id,
    {headers: authToken()}
);
export const getProjectMembers = (id) => axios.get(
    host + "/project/" + id + '/members',
    {headers: authToken()}
);
export const leaveProject = (id) => axios.get(
    host + "/project/" + id + '/leave',
    {headers: authToken()}
);
export const deleteProject = (id) => axios.get(
    host + "/project/" + id + '/delete',
    {headers: authToken()}
);
export const updateProject = (data) => axios.post(
    host + "/project/edit",
    data,
    {headers: authToken()}
);

export const sendMessage = (data) => axios.post(
    host + "/message/send",
    data,
    {headers: authToken()}
);
export const getTaskHistory = (id) => axios.get(
    host + "/changes/" + id,
    {headers: authToken()}
);
export const addProjectMember = (projectId, data) => axios.post(
    host + "/project/" + projectId + '/add-user',
    data,
    {headers: authToken()}
);
export const removeProjectMember = (projectId, userId) => axios.get(
    host + "/project/" + projectId + '/delete-user/' + userId,
    {headers: authToken()}
);

export const uploadFile = (data, taskId) => axios.post(
    host + "/files/upload/" + taskId,
    data,
    {
        headers: {...authToken(), 'Content-Type': 'multipart/form-data'}
    }
);
export const getFileList = taskId => axios.get(
    host + "/files/" + taskId,
    {headers: authToken()}
);
