import React, {Component} from 'react';
import {connect} from 'react-redux';

class AppContainer extends Component {
    render() {
        let props = this.props;
        return (
            <h1>Hello {props.hello.message}</h1>
        );
    }
}

export default connect(state => ({
    hello: state.hello
}))(AppContainer);
