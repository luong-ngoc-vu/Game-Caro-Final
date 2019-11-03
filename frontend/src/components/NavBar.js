import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Dropdown} from "react-bootstrap";
import {logoutUser} from '../actions/authentication';
import '../App.css'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInFB: false,
            nameFB: '',
            emailFB: '',
            pictureFB: '',
            loggedInGG: false,
            nameGG: '',
            emailGG: '',
            pictureGG: ''
        };
    }


    onLogout(e) {
        e.preventDefault();
        // eslint-disable-next-line no-shadow
        const {logoutUser, history} = this.props;
        logoutUser(history);
    }

    render() {
        const responseFacebook = (response) => {
            const payload = {
                id: response.id,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url
            };
            this.setState({loggedInFB: true, nameFB: payload.name, emailFB: payload.email, pictureFB: payload.picture});
        };

        const responseGoogle = (response) => {
            const payload = {
                id: response.profileObj.googleId,
                name: response.profileObj.name,
                email: response.profileObj.email,
                picture: response.profileObj.imageUrl
            };
            this.setState({loggedInGG: true, nameGG: payload.name, emailGG: payload.email, pictureGG: payload.picture});
        };

        const {loggedInFB, nameFB, emailFB, pictureFB, loggedInGG, nameGG, emailGG, pictureGG} = this.state;
        // eslint-disable-next-line react/destructuring-assignment
        const {isAuthenticated, user} = this.props.auth;
        const emailUser = user.email;
        const profileImage = user.profileImg;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Link className="nav-link" to="/update" style={{fontSize: 15, fontWeight: "bold"}}>
                    <img
                        style={{width: 30, height: 30}}
                        src={profileImage}
                        alt="new"
                    />
                    {emailUser}
                </Link>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Manage Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/userInformation">User Information</Dropdown.Item>
                        <Dropdown.Item href="/updatePassword">Change Password</Dropdown.Item>
                        <Dropdown.Item href="/uploadImage">Upload Image</Dropdown.Item>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <Dropdown.Item href="/" onClick={this.onLogout.bind(this)}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div>&nbsp;&nbsp;</div>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Play Game
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/playWithComputer">With Computer</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                {/* eslint-disable-next-line no-nested-ternary */}
                {!loggedInFB && !loggedInGG ?
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Sign In with
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <li className="nav-item">
                                    <FacebookLogin
                                        appId="2404011263146464"
                                        fields="name,email,picture"
                                        autoload={false}
                                        callback={responseFacebook}
                                        icon="fa-facebook" size="small" cssClass="button-facebook-login"
                                    />
                                </li>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <li className="nav-item">
                                    <GoogleLogin
                                        clientId="986011408031-isjggsols6ipv1vgr2vlf2qi06d1703o.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                    />
                                </li>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    : loggedInFB ?
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-link" to="/" style={{fontSize: 15, fontWeight: "bold"}}>
                                <img
                                    style={{width: 30, height: 30}}
                                    src={pictureFB}
                                    alt="new"
                                />
                                {nameFB}
                            </Link>
                            <Link className="nav-link" to="/" style={{fontSize: 15, fontWeight: "bold"}}>
                                Email : {emailFB}
                            </Link>
                            <Redirect to='/playWithComputer'/>
                        </ul> :
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-link" to="/" style={{fontSize: 15, fontWeight: "bold"}}>
                                <img
                                    style={{width: 30, height: 30}}
                                    src={pictureGG}
                                    alt="new"
                                />
                                {nameGG}
                            </Link>
                            <Link className="nav-link" to="/" style={{fontSize: 15, fontWeight: "bold"}}>
                                Email : {emailGG}
                            </Link>
                            <Redirect to='/playWithComputer'/>
                        </ul>

                }
                <div>&nbsp;&nbsp;</div>
                <li className="nav-item">
                    <Link className="nav-link" to="/register" style={{fontSize: 15}}>
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{fontSize: 15}}>
                        Sign In
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <Link className="navbar-brand" to="/home" style={{fontSize: 25, fontWeight: "bold"}}>
                    Game Caro Vietnam
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(withRouter(NavBar));
