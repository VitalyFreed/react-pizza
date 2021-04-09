import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import classNames from 'classnames';

import styles from './login.module.scss';
import {setUser} from "../../../reducers/userReducer";

const Login = () => {
    const dispatch = useDispatch();

    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const history = useHistory();

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
        if (data.success) {
            dispatch(setUser(data));
            history.push('/pizzas');
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles['login__form-container']}>
                    <h1 className={styles.title}>Форма авторизации</h1>
                    <form className={styles['login-form']} method='POST' onSubmit={handleSubmitForm}>
                        <input className={styles['input'] + ' ' + styles['email']} type='email' name='email'
                               value={email} placeholder='Ваш email...'
                               onChange={handleChangeEmail}/>
                        <input className={styles['input'] + ' ' + styles['password']} type='password' name='password'
                               value={password} placeholder='Ваш пароль...'
                               onChange={handleChangePassword}/>
                        <div className={styles['btns-block']}>
                            <input className={styles['submit-btn']} type='button' onClick={handleSubmitForm} name='submitBtn' value='Войти'/>
                            <Link to='/auth/registration' className={classNames(styles['submit-btn'], styles['submit-btn-register'])}>Регистрация</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;