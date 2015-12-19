import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {login} from '../../actions/login/index';

class LoginLayout extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        history: PropTypes.object.isRequired
    }

    submit(e) {
        e.preventDefault();

        this.props
            .submit({
                username: this.refs._usernameInput.value,
                password: this.refs._passwordInput.value
            });
    }

    render() {
        return (
            <form onSubmit={e => this.submit(e)}>
                <label htmlFor="login-username">Username (hint: anything)</label><br />
                <input id="login-username" placeholder="type anything" ref="_usernameInput" /><br />
                <label htmlFor="login-password">Password (hint: anything)</label><br />
                <input id="login-password" type="password" ref="_passwordInput" /><br />
                <input type="submit" value="Submit" />
                <span>{this.props.isLoading ? 'Loading...' : ''}</span>
            </form>
        );
    }
}

let mapStateToProps = state => ({isLoading: state.auth.isLoading});
let mapDispatchToProps = dispatch => bindActionCreators({submit: login}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);
