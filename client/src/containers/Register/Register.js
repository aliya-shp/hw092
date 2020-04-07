import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";

import {registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayName: '',
        avatar: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.registerUser(formData);
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0],
        })
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <Fragment>
                <h2>Register new user</h2>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        {this.props.error.global}
                    </Alert>
                )}

                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('username')}
                        placeholder="Enter desired username"
                        autoComplete="new-username"
                    />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter password"
                        autoComplete="new-password"
                    />

                    <FormElement
                        propertyName="displayName"
                        title="displayName"
                        type="text"
                        value={this.state.displayName}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('displayName')}
                        placeholder="Enter your display name"
                    />

                    <FormElement
                        propertyName="avatar"
                        title="Avatar"
                        type="file"
                        onChange={this.fileChangeHandler}
                    />

                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError,
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);