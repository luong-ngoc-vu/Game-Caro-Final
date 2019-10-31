import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import gameReducer from '../reducers/gameReducer';
import setAuthToken from '../setAuthToken';
import Store from '../store';
import {setCurrentUser, logoutUser} from '../actions/authentication';

import Register from './Register';
import Login from './Login';
import Home from './Home';
import Game from './Game';
import NavBar from './NavBar';
import Update from './Update';
import UserInformation from "./UserInformation";
import UpdatePassword from "./UpdatePassword";
import UploadImage from "./UploadImage";

const storeGame = createStore(gameReducer);

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
    <Router>
        <Provider store={storeGame}>
            <Route path="/playWithComputer" component={Game}/>
        </Provider>
        <Provider store={Store}>
            <NavBar/>
            <Route path="/home" component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/update" component={Update}/>
            <Route path="/userInformation" component={UserInformation}/>
            <Route path="/updatePassword" component={UpdatePassword}/>
            <Route path="/uploadImage" component={UploadImage}/>
        </Provider>
    </Router>
);

export default Root;