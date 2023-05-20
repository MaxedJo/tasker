import * as React from 'react';
import {useEffect, useState} from 'react';
import UsersList from "./UsersList";
import Toolbar from "@mui/material/Toolbar";
import {arrayIntersectionFilter, validateUser} from "../../utility";
import {Button, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {addProjectMember, getUserList, removeProjectMember} from "../../api/client";
import AddIcon from '@mui/icons-material/Add';

export default function ProjectUsersList(props) {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState('');
    const [members, setMembers] = useState(props.items);

    useEffect(() => {
        getUserList()
            .then(r => {
                setUsers(arrayIntersectionFilter(
                    r.data,
                    members,
                    props.ownerId,
                    'id'
                ))
            })
    }, []);
    const handleChange = (event) => {
        setSelected(event.target.value);
    };
    const add = () => {
        addProjectMember(props.projectId, {id: selected})
            .then(r => {
                setMembers(r.data.members)
                setUsers(arrayIntersectionFilter(
                    users,
                    r.data.members,
                    props.ownerId,
                    'id'
                ))
            })
    }
    const handleDelete = id => {
        removeProjectMember(props.projectId, id)
            .then(r => {
                setMembers(r.data.members)
                getUserList()
                    .then(f => {
                        setUsers(arrayIntersectionFilter(
                            f.data,
                            r.data.members,
                            props.ownerId,
                            'id'
                        ))
                    })
            })
    }
    return (
        <>
            {validateUser([props.ownerId],
                <Toolbar disabled={true}>
                    <Button
                        startIcon={<AddIcon/>}
                        onClick={add}
                        disabled={selected === '' || users.length === 0}
                    >
                        Добавить
                    </Button>
                    <Select
                        sx={{
                            maxWidth: '400px'
                        }}
                        disabled={users.length === 0}
                        fullWidth
                        size="small"
                        label=""
                        value={selected}
                        onChange={handleChange}
                    >
                        <MenuItem key="0" value=''>
                            <Typography
                                variant="h7">-</Typography>
                        </MenuItem>
                        {users.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                <Typography
                                    variant="h7">{option.fio} {option.username} {option.profession}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </Toolbar>)}
            <UsersList
                items={members}
                canDelete={props.canDelete}
                onDelete={handleDelete}
                ownerId={props.ownerId}
            />
        </>
    );
}