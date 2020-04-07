import React, {Component} from 'react';
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {createAlbum} from "../../store/actions/albumsActions";
import {connect} from "react-redux";
import {getArtists} from "../../store/actions/artistsActions";

class NewAlbum extends Component {
    componentDidMount() {
        this.props.getArtists();
    }

    createAlbum = albumData => {
        this.props.createAlbum(albumData);
        this.props.history.push('/');
    };

    render() {
        return (
            <>
                <h2>New album</h2>
                <AlbumForm
                    onSubmit={this.createAlbum}
                    artists={this.props.artists}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    artists: state.artists.artists,
});

const mapDispatchToProps = dispatch => ({
    createAlbum: albumData => dispatch(createAlbum(albumData)),
    getArtists: () => dispatch(getArtists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);