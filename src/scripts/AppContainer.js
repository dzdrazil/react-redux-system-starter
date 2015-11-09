import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class AppContainer extends Component {
    render() {
        let props = this.props;
        return (
            <div>
                <h1>Hello {props.user ? props.user.username : 'World'}!</h1>
                {this.props.children}
            </div>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.object
};

export default connect(state => ({
    user: state.auth.user
}))(AppContainer);
