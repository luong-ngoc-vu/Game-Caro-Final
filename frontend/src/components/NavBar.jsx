import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser, loginWithGoogle} from '../actions/authentication';
import '../App.css'

class Navbar extends Component {
    onLogout(e) {
        e.preventDefault();
        // eslint-disable-next-line no-shadow
        const {logoutUser, history} = this.props;
        logoutUser(history);
    }

    onGoogleClick(e) {
        e.preventDefault();
        // eslint-disable-next-line no-shadow
        const {loginWithGoogle} = this.props;
        loginWithGoogle();
    }

    render() {
        // eslint-disable-next-line react/destructuring-assignment
        const {isAuthenticated, user} = this.props.auth;
        const emailUser = user.email;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Link className="nav-link" to="/game">
                    Play Game
                </Link>
                <Link className="nav-link" to="/userInformation">
                    User Information
                </Link>
                <Link className="nav-link" to='/update'>
                    {emailUser}
                </Link>
                <a href="/" className="nav-link" onClick={this.onLogout.bind(this)}>
                    Logout
                </a>
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
                    <a href="/" className="nav-link" onClick={this.onGoogleClick.bind(this)}>
                        Google
                    </a>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    loginWithGoogle: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {logoutUser, loginWithGoogle}
)(withRouter(Navbar));