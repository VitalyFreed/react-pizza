import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';

import styles from './registration.module.scss';

import {setUser} from "../../../reducers/userReducer";

const Registration = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [firstName, changeFirstName] = useState('');
    const [lastName, changeLastName] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const handleChangeFirstName = e => {
        changeFirstName(e.target.value);
    };

    const handleChangeLastName = e => {
        changeLastName(e.target.value);
    };

    const handleChangeEmail = e => {
        changeEmail(e.target.value);
    };

    const handleChangePassword = e => {
        changePassword(e.target.value);
    };

    const handleSubmitForm = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });
        const data = await response.json();
        console.log(data)
        if (data.success) {
            dispatch(setUser(data));
            history.push('/auth/login');
        }
    };

    return (
        <div>
            <form method='POST' onSubmit={handleSubmitForm}>
                <input type='text' name='firstName' value={firstName} placeholder='Ваше имя...'
                       onChange={handleChangeFirstName}/>
                <input type='text' name='lastName' value={lastName} placeholder='Ваше фамилия...'
                       onChange={handleChangeLastName}/>
                <input type='email' name='email' value={email} placeholder='Ваш email...' onChange={handleChangeEmail}/>
                <input type='password' name='password' value={password} placeholder='Ваш пароль...'
                       onChange={handleChangePassword}/>
                <input type='submit' name='submitBtn' value='Зарегистрироваться'/>
            </form>
        </div>
    );
};

export default Registration;