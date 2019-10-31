import React from 'react';
import {FormGroup, FormLabel, Button, FormControl} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updatePassword} from '../actions/authentication';
import '../bootstrap.css';
import '../App.css';

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpassword: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // eslint-disable-next-line react/sort-comp
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const {oldpassword, password} = this.state;
        // eslint-disable-next-line no-shadow
        const {updatePassword, history} = this.props;
        const newUser = {oldpassword, password};
        updatePassword(newUser, history);
    }

    render() {
        const {oldpassword, password} = this.state;

        return (
            <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="h2">Update Password Form</h2>
                    <br/>
                    <div className="form-group">
                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Input old password</FormLabel>
                            <FormControl
                                type="password"
                                name="oldpassword"
                                onChange={this.handleInputChange}
                                value={oldpassword}
                            />
                        </FormGroup>
                    </div>
                    <div className="form-group">
                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Input a new password</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                onChange={this.handleInputChange}
                                value={password}
                            />
                        </FormGroup>
                    </div>
                    <Button className="primary right-w3l" type="submit">
                        Update
                    </Button>
                </form>
            </div>
        );
    }
}

UpdatePassword.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    updatePassword: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types,react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {updatePassword}
)(withRouter(UpdatePassword));