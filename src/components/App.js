import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Registration from "./Auth/Registration/Registration";
import Login from "./Auth/Login/Login";

import {getAuth} from "../reducers/pizzaReducer";
import {useSelector} from "react-redux";

const App = () => {
    const isAuth = useSelector(getAuth);

    return (
        <div className='wrapper'>
            <div className='container'>
                <Header/>
                {
                    isAuth ? <Main/> : <Redirect to='/auth/login'/>
                }
                <Switch>
                    <Route exact path='/auth/registration'>
                        <Registration/>
                    </Route>
                    <Route exact path='/auth/login'>
                        <Login/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
