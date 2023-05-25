import axios from "axios";
import authToken from "../authToken";

const host = process.env.REACT_APP_BACKEND_HOST;

const get = (uri, headers) =>
    axios.get(host + uri, {headers: {...headers, ...authToken()}});
const post = (uri, data, headers) =>
    axios.post(host + uri, data, {headers: {...headers, ...authToken()}});

export const getUserInfo = userId => get("/user-api/user/" + userId, {});
export const getUserCurrent = () => get("/user-api/user", {});
export const getUserList = () => get("/user-api/user/all", {});
export const updateUser = data => post("/user-api/user/edit", data, {});

export const deleteTask = taskId => get("/task/" + taskId + '/delete', {});
export const getTaskCreated = () => get("/user-api/created-tasks", {});
export const getTaskAssigned = () => get("/user-api/assigned-tasks", {});
export const updateTask = data => post("/task/edit", data, {});
export const getTask = id => get("/task/" + id, {});
export const addTask = data => post("/task/add", data, {});

export const getProjectList = () => get("/project/all", {});
export const getProjectInfo = id => get("/project/" + id, {});
export const getProjectByTask = id => get("/project/task/" + id, {});
export const getProjectMembers = id => get("/project/" + id + '/members', {});
export const leaveProject = id => get("/project/" + id + '/leave', {});
export const deleteProject = id => get("/project/" + id + '/delete', {});
export const updateProject = data => post("/project/edit", data, {});
export const sendMessage = data => post("/message/send", data, {});
export const getTaskHistory = id => get("/changes/" + id, {});
export const addProjectMember = (projectId, data) => post("/project/" + projectId + '/add-user', data, {});
export const removeProjectMember = (projectId, userId) => get("/project/" + projectId + '/delete-user/' + userId, {});

export const uploadFile = (data, taskId) => post("/files/upload/" + taskId, data, {'Content-Type': 'multipart/form-data'});
export const getFileList = taskId => get("/files/" + taskId, {});
export const deleteFile = id => get("/files/delete/" + id, {});
export const getFile = id => get("/files/files/" + id, {});
