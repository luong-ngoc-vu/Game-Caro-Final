import axios from 'axios';
import JwtDecode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from '../setAuthToken';

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
    // eslint-disable-next-line no-unused-vars
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = JwtDecode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const updateUsername = (user, history) => dispatch => {
    axios.post('/api/users/me/update', user)
    // eslint-disable-next-line no-unused-vars
        .then(res => history.push('/home'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
};

