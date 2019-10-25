import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import JwtDecode from 'jwt-decode';
import Game from './Game';
import Store from '../store';
import setAuthToken from '../setAuthToken';
import {setCurrentUser, logoutUser} from '../actions/authentication';

import Register from './Register';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';
import Update from './Update';
import UserInformation from "./UserInformation";

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = JwtDecode(localStorage.jwtToken);
    Store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        Store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

const Root = () => (
    <Provider store={Store}>
        <Router>
            <NavBar/>
            <br/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/game" component={Game}/>
                <Route path="/update" component={Update}/>
                <Route path="/userInformation" component={UserInformation}/>
            </Switch>
        </Router>
    </Provider>
);

export default Root;