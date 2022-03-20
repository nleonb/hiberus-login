import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateRegister from "../../utils/rules/form-validator-register-rules";
import useForm from "../../utils/validators/useForm";

const Register = () => {
    // useForm is a custom hook to make custom validation on any form
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(register, validateRegister);

    // this message come form backend response in case any error
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    async function register (e) {
        try {
            await axios.post('http://localhost:5000/users', {
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
                confPassword: values.confPassword
            });
            // In case success register the use go to login page
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    // If user is on register page by error exist de possibility to back to the login page
    const GoToLogin = async (e) => {
        navigate("/");
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={handleSubmit} className="box">
                                {
                                    msg &&
                                        <p className="has-text-centered">
                                            <span className="tag is-danger is-light">{msg}</span>
                                        </p>
                                }
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Name"
                                            name={'name'}
                                            value={values.name || ''}
                                            onChange={handleChange}
                                        />
                                        {
                                            errors.name && (
                                                <p className="has-text-centered">
                                                    <span className="tag is-danger is-light">{errors.name}</span>
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Surname</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Surname"
                                            name={'surname'}
                                            value={values.surname || ''}
                                            onChange={handleChange}
                                        />
                                        {
                                            errors.surname && (
                                                <p className="has-text-centered">
                                                    <span className="tag is-danger is-light">{errors.surname}</span>
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input
                                            type="email"
                                            className="input"
                                            placeholder="Email"
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
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="******"
                                            name={'confPassword'}
                                            value={values.confPassword || ''}
                                            onChange={handleChange}
                                        />
                                        {
                                            errors.confPassword && (
                                                <p className="has-text-centered">
                                                    <span className="tag is-danger is-light">{errors.confPassword}</span>
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                                <div className="field mt-5">
                                    <button
                                        className="button is-link is-fullwidth"
                                        onClick={GoToLogin}
                                    >
                                        Back to Login
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

export default Register