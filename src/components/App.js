import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Registration from "./Auth/Registration/Registration";
import Login from "./Auth/Login/Login";

import {getAuth} from "../reducers/userReducer";
import {useSelector} from "react-redux";
import Profile from "./Profile/Profile";

const App = () => {
    const isAuth = useSelector(getAuth);

    return (
        <React.Fragment>
            <Switch>
                <Route path='/pizzas'>
                    <div className='wrapper'>
                        <div className='container'>
                            <Header/>
                            <Main/>
                        </div>
                    </div>
                </Route>
                <Route exact path='/auth/registration'>
                    <Registration/>
                </Route>
                <Route exact path='/auth/login'>
                    <Login/>
                </Route>
                {
                    isAuth ? <Route exact path='/profile'>
                        <Profile/>
                    </Route> : null
                }
            </Switch>
        </React.Fragment>
    );
}

export default App;
