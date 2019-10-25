import React from 'react';
import {FormGroup, FormLabel, Button, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {loginUser} from '../actions/authentication';
import '../bootstrap.css';
import '../App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
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

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.auth.isAuthenticated) {
            history.push('/home');
        }
        if (nextProps.errors) {
            this.setState({
                // eslint-disable-next-line react/no-unused-state
                errors: nextProps.errors
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        // eslint-disable-next-line no-shadow
        const {loginUser} = this.props;
        const user = {
            email,
            password
        };
        loginUser(user);
    }

    render() {
        const {errors, email, password} = this.state;

        return (
            <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="h2">Login Form</h2>
                    <br/>
                    <div className="form-group">
                        <FormGroup controlId="formBasicEmail">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                onChange={this.handleInputChange}
                                value={email}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </FormGroup>
                    </div>
                    <div className="form-group">
                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                placeholder="Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                onChange={this.handleInputChange}
                                value={password}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </FormGroup>
                    </div>
                    <Button className="primary right-w3l" type="submit">
                        Log In
                    </Button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);
