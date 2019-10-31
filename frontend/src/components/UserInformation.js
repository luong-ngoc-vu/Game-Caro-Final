import React from 'react';
import {FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authentication';
import '../bootstrap.css';
import '../App.css';

class UserInformation extends React.Component {
    render() {
        // eslint-disable-next-line react/destructuring-assignment
        const {user} = this.props.auth;
        const {name, email, profileImg} = user;

        return (
            <div className="modal-body">
                <form>
                    <h2 className="h2">User Information</h2>
                    <br/>
                    <div className="form-group">
                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Username</FormLabel>
                            <FormControl
                                type="text"
                                name="name"
                                value={name}
                                readOnly
                            />
                        </FormGroup>
                    </div>
                    <div className="form-group">
                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type="email"
                                name="email"
                                value={email}
                                readOnly
                            />
                        </FormGroup>
                    </div>
                    <div className="form-group">
                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Image Profile URL</FormLabel>
                            <br/>
                            <div className="withBorder">
                                <img
                                    style={{width: 300, height: 200}}
                                    src={profileImg}
                                    alt="new"
                                />
                            </div>
                        </FormGroup>
                    </div>
                </form>
            </div>
        );
    }
}

UserInformation.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    logoutUser: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(withRouter(UserInformation));