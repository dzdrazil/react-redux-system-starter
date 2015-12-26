import React, {Component, PropTypes} from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

import {Password} from '../../domain/types/Password';

let LoginFormModel = t.struct({
    username: t.String,
    password: Password
});

let loginFormOptions = {
    order: ['username', 'password'],
    auto: 'placeholders',
    legend: (<i>Login</i>),
    help: (<i>(example u/p: test / Test!)</i>),
    fields: {
        password: {
            type: 'password'
        }
    }
};

export default class LoginForm extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isErrored: PropTypes.bool.isRequired
    }

    getStatusMessage() {
        if (this.props.isLoading) {
            return 'Loading...';
        } else if (this.props.isErrored) {
            return 'Error logging in';
        }

        return '';
    }

    submit(e) {
        let value = this.refs.form.getValue();
        if (!value) {
            // validation error
            e.preventDefault();
            return;
        }

        this.props.submit(e, value);
    }

    render() {
        return (
            <form onSubmit={e => this.submit(e)}>
                <Form
                    ref="form"
                    type={LoginFormModel}
                    options={loginFormOptions} />
                <input type="submit" value="Submit" />
                <span>{this.getStatusMessage()}</span>
            </form>
        );
    }
}
