import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import Header from "../parts/Header";

const Checker = ({children}) => {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const bearer = JSON.parse(localStorage.getItem('token'))
        if (bearer) {
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + bearer;

                return config;
            });

            axios.get('http://127.0.0.1:8000/api').then(r => {
                setToken(bearer);
            }).catch(err => {
                setToken(null);
                localStorage.removeItem('token');
            })
        } else {
            setToken(null);
        }
    }, []);

    if (token === null) {
        navigate('/login');
    }

    return token ?
        (
            <>
                <Header/>
                {
                    children
                }
            </>
        ) : <div>Loading </div>

}


export default Checker;
