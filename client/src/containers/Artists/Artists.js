import React, {Component} from 'react';
import Artist from "../../components/Artist/Artist";
import {connect} from "react-redux";
import {deleteArtist, getArtists, publishArtist} from "../../store/actions/artistsActions";

class Artists extends Component {

    componentDidMount() {
        this.props.getArtists();
    };

    isVisible = (artist) => {
        return artist.published || (this.props.user && this.props.user.role === 'admin');
    };

    deleteArtist = (artistId) => {
        this.props.deleteArtist(artistId);
    };

    publishArtist = (artistId) => {
        this.props.publishArtist(artistId);
    };

    render() {
        return (
            <>
                <h2>Artists</h2>
                {this.props.artists.map(artist => (
                    this.isVisible(artist) && (
                        <Artist key={artist._id}
                           _id={artist._id}
                           name={artist.name}
                           photo={artist.photo}
                           publish={()=>this.publishArtist(artist._id)}
                           published={artist.published}
                           isAdminView={this.props.user && this.props.user.role === 'admin'}
                           deleteArtist={()=>this.deleteArtist(artist._id)}
                        />
                    )
                ))}
            </>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    getArtists: () => dispatch(getArtists()),
    deleteArtist: (artistId) => dispatch(deleteArtist(artistId)),
    publishArtist: (artistId) => dispatch(publishArtist(artistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);