import React, {Component} from 'react';
import {connect} from 'react-redux';

const HOME_JSX = (
    <div>Some content should go here</div>
);

class HomeLayout extends Component {
    render() {
        return HOME_JSX;
    }
}

let mapStateToProps = state => state;

export default connect(mapStateToProps)(HomeLayout);
