import React from 'react';
import {FormGroup, FormLabel, Button, FormControl} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateUsername} from '../actions/authentication';
import '../bootstrap.css';
import '../App.css';

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
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
        const {email, username} = this.state;
        // eslint-disable-next-line no-shadow
        const {updateUsername, history} = this.props;
        updateUsername(email, history);
    }

    render() {
        // eslint-disable-next-line react/destructuring-assignment
        const {user} = this.props.auth;
        const {email} = user;

        return (
            <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="h2">Update Information Form</h2>
                    <br/>
                    <div className="form-group">
                        <FormGroup controlId="formBasicEmail">
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
                            <FormLabel>Username</FormLabel>
                            <FormControl
                                type="text"
                                name="username"
                                onChange={this.handleInputChange}
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

Update.propTypes = {
    updateUsername: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {updateUsername}
)(withRouter(Update));