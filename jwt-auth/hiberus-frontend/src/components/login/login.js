import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useForm from "../../utils/validators/useForm";
import validateLogin from "../../utils/rules/form-validator-login-rules";

const Login = () => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validateLogin);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    async function login (e) {
        try {
            await axios.post('http://localhost:5000/login', {
                email: values.email,
                password: values.password
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const GoToRegister = async (e) => {
        navigate("/register");
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={handleSubmit} className="box" >
                                {
                                    msg &&
                                    <p className="has-text-centered">
                                        <span className="tag is-danger is-light">{msg}</span>
                                    </p>
                                }
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="email"
                                            name={'email'}
                                            value={values.email || ''}
                                            onChange={handleChange}
                                        />
                                        {
                                            errors.email && (
                                                <p className="has-text-centered">
                                                    <span className="tag is-danger is-light">{errors.email}</span>
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="******"
                                            name={'password'}
                                            value={values.password || ''}
                                            onChange={handleChange}
                                        />
                                        {
                                            errors.password && (
                                                <p className="has-text-centered">
                                                    <span className="tag is-danger is-light">{errors.password}</span>
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                                <div className="field mt-5">
                                    <button
                                        className="button is-link is-fullwidth"
                                        onClick={GoToRegister}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login