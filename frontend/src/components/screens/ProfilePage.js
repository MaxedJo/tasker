import axios from "axios";
import authToken from "../../authToken";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import ProfileTable from "../ui/ProfileTable";
import ProfileForm from "../ui/ProfileForm";

export default function ProfilePage() {
    const [user, setUser] = useState({})
    const [edit,setEdit] = useState(true);

    const handleEdit = () => {
      setEdit(false);
    }

    const {user: currentUser} = useSelector((state) => state.auth);

    useEffect(() => {
        axios.get("http://localhost:8080/user-api/user", {headers: authToken()})
            .then(response => {
                setUser(response.data)
            });
    }, []);
    const userBase= user;
    console.log(userBase)
    const userData = [
        {
            key: 'Имя пользователя',
            value: user.username
        },
        {
            key: 'ФИО',
            value: user.fio,
        },
    ]
    if (!currentUser) {
        return <Navigate to="/login"/>;
    }


    return (
        <Box>
            <Typography mt={3} variant="h3">Профиль</Typography>
            {edit
                ?
                <>
                    <ProfileTable userData={userData}/>
                    <Button sx={{mt: 4}} variant="contained" onClick={handleEdit}>Редактировать профиль</Button>
                </>
            :
                    <ProfileForm userData={userBase}/>

            }
        </Box>
    );
}