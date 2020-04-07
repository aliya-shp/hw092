import React, {Component} from 'react';
import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {addArtist} from "../../store/actions/artistsActions";
import {connect} from "react-redux";

class NewArtist extends Component {

    addArtist = async (artistData) => {
        await this.props.addArtist(artistData);
        this.props.history.push('/');
    };


    render() {
        return (
            <>
                <h2>New artist</h2>
                <ArtistForm onSubmit={this.addArtist} />
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addArtist: artistData => dispatch(addArtist(artistData))
});

export default connect(null, mapDispatchToProps)(NewArtist);