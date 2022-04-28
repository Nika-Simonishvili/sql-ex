import React, {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import Header from "../../parts/Header";

export default function Register() {
    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const onSubmit = data => {
        axios.post('api/register', data).then(res => {
            navigate('/login');
        }).catch((err) => setErrors(err.response.data.errors))
    };

    return (
        <>
            <Header/>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">Register</div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="name" className="form-control"
                                               placeholder="Enter name" {...register("name")}/>
                                        <span className="text-danger">{errors.name}</span>
                                    </div>
                                    <br/>

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

                                    <div className="form-group">
                                        <label>Repeat Password</label>
                                        <input type="password" className="form-control"
                                               placeholder="Enter password" {...register("password_confirmation")}/>
                                    </div>
                                    <br/>

                                    <button type="submit" className="btn btn-outline-primary btn-block">Register
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
