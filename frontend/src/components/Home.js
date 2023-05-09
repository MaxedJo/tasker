import React, {useEffect, useState} from "react";

import authToken from "../authToken";
import axios from "axios";


const Home = () => {
    const [content, setContent] = useState("");


    useEffect(() => {
        axios
            .get("http://localhost:8080/user-api/user/all",
                {
                headers : authToken(),
            }
            )
            .then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{JSON.stringify(content)}</h3>
            </header>
        </div>
    );
};

export default Home;