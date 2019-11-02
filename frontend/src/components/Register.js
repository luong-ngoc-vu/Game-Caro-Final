import React from 'react';
import {FormGroup, FormLabel, Button, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../actions/authentication';
import '../bootstrap.css';
import '../App.css';

class Register extends React.Component {
    // eslint-disable-next-line react/sort-comp
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {name, email, password} = this.state;
        // eslint-disable-next-line no-shadow
        const {registerUser, history} = this.props;
        const user = {
            name,
            email,
            password
        };
        registerUser(user, history);
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.auth.isAuthenticated) {
            history.push('/');
        }
        if (nextProps.errors) {
            this.setState({
                // eslint-disable-next-line react/no-unused-state
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        const {auth, history} = this.props;
        if (auth.isAuthenticated) {
            history.push('/');
        }
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {errors, email, password, name} = this.state;
        return (
            <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="h2">Register Form</h2>
                    <br/>
                    <div className="form-group">
                        <FormGroup controlId="formBasicEmail">
                            <FormLabel style={{fontSize: 20, fontWeight: "bold"}}>Username</FormLabel>
                            <FormControl
                                type="text"
                                name="name"
                                placeholder="Enter username"
                                onChange={this.handleInputChange}
                                value={name}
                            />
                        </FormGroup>
                    </div>
                    <div className="form-group">
                        <FormGroup controlId="formBasicEmail">
                            <FormLabel style={{fontSize: 20, fontWeight: "bold"}}>Email</FormLabel>
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
                            <FormLabel style={{fontSize: 20, fontWeight: "bold"}}>Password</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                placeholder="Enter password"
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
                    <div className="form-group">
                        <Button className="btn btn-primary" type="submit">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register));
