import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import Header from "../../parts/Header";

export default function Login() {
    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(response => {
        });
    }, []);

    const onSubmit = data => {
        axios.post('api/login', data).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token));
            localStorage.setItem('username', JSON.stringify(res.data.user.name));
            navigate('/');
        }).catch((err) =>
            setErrors(err.response.data.errors))
    }

    return (
        <>
            <Header/>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h5>Sign in</h5>

                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" className="form-control"
                                               placeholder="Enter email" {...register("email")}/>
                                        <span className="text-danger">{errors.email}</span>
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control"
                                               placeholder="Enter password" {...register("password")}/>
                                        <span className="text-danger">{errors.password}</span>
                                    </div>
                                    <br/>

                                    <button type="submit" className="btn btn-outline-primary btn-block">Login</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
