import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Dropdown} from "react-bootstrap";
import {logoutUser, loginWithFacebook} from '../actions/authentication';
import '../App.css'

class NavBar extends Component {
    onLogout(e) {
        e.preventDefault();
        // eslint-disable-next-line no-shadow
        const {logoutUser, history} = this.props;
        logoutUser(history);
    }

    onClickFacebook(e) {
        e.preventDefault();
        // eslint-disable-next-line no-shadow
        const {loginWithFacebook} = this.props;
        loginWithFacebook();
    }

    render() {
        // eslint-disable-next-line react/destructuring-assignment
        const {isAuthenticated, user} = this.props.auth;
        const emailUser = user.email;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Manage Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/userInformation">User Information</Dropdown.Item>
                        <Dropdown.Item href="/update">{emailUser}</Dropdown.Item>
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
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Sign In
                    </Link>
                </li>
                <li className="nav-item">
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Link className="nav-link" to="/auth/facebook" onClick={this.onClickFacebook.bind(this)}>
                        Facebook
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <Link className="navbar-brand" to="/home">
                    Game Caro Online
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
    loginWithFacebook: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {logoutUser, loginWithFacebook}
)(withRouter(NavBar));
