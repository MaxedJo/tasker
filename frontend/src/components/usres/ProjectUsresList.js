import * as React from 'react';
import UsersList from "./UsresList";

export default function ProjectUsersList(props) {
    return (
        <UsersList items={props.items}/>
    );
}