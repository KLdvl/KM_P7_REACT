import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {serverUrl} from '../../variables/variables'

export function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);

            const payload = {
                "email": state.email,
                "password": state.password
            }

            axios.post(`${serverUrl}/auth/login`, payload)
                .then(res => {
                    if (res.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Login successfull. Redirecting to post page'
                        }))
                        localStorage.setItem('user', JSON.stringify(res.data))
                        redirectToHome();
                        props.showError(null)
                    } else {
                        props.showError("Some error occured")
                    }
                })
                .catch(err => console.error(err))
        } else {
            props.showError('Please enter a valid email and password')
        }
    }

    const navigate = useNavigate();
    const redirectToHome = () => {
        navigate('/')
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label>Email address :</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label>Password :</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        className="form-control"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Log in
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none'}}
                 role="alert">{state.successMessage} </div>
        </div>
    )
}