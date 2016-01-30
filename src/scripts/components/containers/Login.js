import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {login} from '../../actions/login/index';
import LoginForm from '../presentation/LoginForm';

class LoginLayout extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired,
        history: PropTypes.object.isRequired
    };

    submit(e, loginFormModel) {
        e.preventDefault();

        this.props.submit(loginFormModel);
    }

    render() {
        return (
            <LoginForm
                submit={(e, v) => this.submit(e, v)}
                isLoading={this.props.isLoading}
                isErrored={this.props.isError} />
        );
    }
}

let mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    isError: !!state.auth.error
});
let mapDispatchToProps = dispatch => bindActionCreators({submit: login}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);
