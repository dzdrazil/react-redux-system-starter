import React, {Component, PropTypes} from 'react';
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

    render() {
        return (
            <LoginForm
                submit={this.props.submit}
                isLoading={this.props.isLoading}
                isErrored={this.props.isError} />
        );
    }
}

let mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    isError: !!state.auth.error
});

export default connect(mapStateToProps, {submit: login})(LoginLayout);
