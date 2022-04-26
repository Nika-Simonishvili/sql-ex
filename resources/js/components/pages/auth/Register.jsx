import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import {useState} from "react";
import { useNavigate} from "react-router";
import Header from "../../parts/Header";

export default function Register() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()

    const onSubmit = data => {
        axios.post('api/register', data).then(res => {
            navigate('/login');
        }).catch((err) => {
            if (err.response && err.response.status === 422) {
              setErrors(err.response.data.errors);
            }
          });
    }

    return(
        <>
        <Header />
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">Register</div>

                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h5>Sign up</h5>
                  <div className="form-group">
                      <label>Name</label>
                      <input type="name" className="form-control" placeholder="Enter name" {...register("name", { required: true })}/>
                      {errors.name && <span className="text-danger">This field is required</span>}
                  </div>  <br/>
                  <div className="form-group">
                      <label>Email address</label>
                      <input type="email" className="form-control" placeholder="Enter email" {...register("email", { required: true })}/>
                      {errors.email && <span className="text-danger">This field is required</span>}
                  </div>  <br/>
                  <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Enter password" {...register("password", { required: true })}/>
                      {errors.password && <span className="text-danger">This field is required</span>}
                  </div>  <br/>

                  <button type="submit" className="btn btn-outline-primary btn-block">Register</button>

              </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
