import React, {useEffect, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import ProfileTable from "../ui/ProfileTable";
import ProfileForm from "../ui/ProfileForm";
import {validateUser} from "../../utility";

export default function ProfilePage() {
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(true);
    const profile = useLoaderData();

    const handleEdit = () => {
        setEdit(false);
    }

    useEffect(() => {
        setUser(profile.data);
    }, []);
    const userBase = user;
    const userData = [
        {
            key: 'Имя пользователя',
            value: userBase.username
        },
        {
            key: 'ФИО',
            value: userBase.fio,
        },
        {
            key: 'Профессия',
            value: userBase.profession,
        },
    ]


    return (
        <Box>
            <Typography mt={3} variant="h3">Профиль</Typography>
            {edit
                ?
                <>
                    <ProfileTable userData={userData}/>
                    {validateUser(user.id, <Button sx={{mt: 4}} variant="contained" onClick={handleEdit}>Редактировать
                        профиль</Button>)}
                </>
            :
                    <ProfileForm userData={userBase}/>

            }
        </Box>
    );
}