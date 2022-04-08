import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('api/logout', {}).then((res) => {
            localStorage.removeItem('token');
            navigate('/');
        })
    }, []);

    return (
        <></>
    )
}
