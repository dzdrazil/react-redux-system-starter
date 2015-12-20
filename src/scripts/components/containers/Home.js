import React, {Component} from 'react';
import {connect} from 'react-redux';

const HOME_JSX = (
    <div>Some content should go here!</div>
);

class HomeLayout extends Component {

    getPetsMarkup(props) {
        if (props.isLoading) {
            return (<p>Loading your pets...</p>);
        } else if (props.error) {
            return (<p>Theres been an error!</p>);
        }

        return (
            <ul>
                {props.pets.map(pet => (<li key={pet.id}>{pet.name}</li>))}
            </ul>
        );
    }

    render() {
        return (
            <section>
                {HOME_JSX}
                {this.getPetsMarkup(this.props)}
            </section>
        );
    }
}

let mapStateToProps = state => ({...state.pets});

export default connect(mapStateToProps)(HomeLayout);
