import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import styles from './login.module.scss';
import {setAuth} from "../../../reducers/pizzaReducer";

const Login = () => {
    const dispatch = useDispatch();

    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const handleChangeEmail = e => {
        changeEmail(e.target.value);
    };

    const handleChangePassword = e => {
        changePassword(e.target.value);
    };

    const handleSubmitForm = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        console.log(data)
        if (data.success) {
            dispatch(setAuth(data.success));
        }
    }

    return (
        <div>
            <form method='POST' onSubmit={handleSubmitForm}>
                <input type='email' name='email' value={email} placeholder='Ваш email...' onChange={handleChangeEmail}/>
                <input type='password' name='password' value={password} placeholder='Ваш пароль...'
                       onChange={handleChangePassword}/>
                <input type='submit' name='submitBtn' value='Войти'/>
            </form>
        </div>
    );
};

export default Login;