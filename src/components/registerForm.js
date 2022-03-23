import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from '../services/userService';
import auth from '../services/authService'
import {toast} from "react-toastify";

class RegisterForm extends Form {

    state = {
        data: {username: '', password: '', name: ''},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username').email(),
        password: Joi.string().label('Password').min(8).required(),
        name: Joi.string().required().label('Name')
    }

    doSubmit = async () => {
        // call the server
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token'])
            window.location = '/';
        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <div>
                <h1 className="text-center">Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;