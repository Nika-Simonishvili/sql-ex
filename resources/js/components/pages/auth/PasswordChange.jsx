import React, {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";

export default function PasswordChange() {
    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const onSubmit = data => {
        axios.post('api/password-change', data).then(res => {
            console.log(data)
            navigate('/');
        }).catch((err) =>
            setErrors(err.response.data.errors))
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">Change Password</div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <label>Enter new password:</label>
                                        <input type="password" className="form-control"
                                               placeholder="New password..." {...register("password")}/>
                                        <p className='text-danger'> {errors.password} </p>
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                        <label>Repeat password:</label>
                                        <input type="password" className="form-control"
                                               placeholder="Repeat password" {...register("password_confirmation")}/>
                                    </div>
                                    <br/>

                                    <button type="submit" className="btn btn-outline-primary btn-block">Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
