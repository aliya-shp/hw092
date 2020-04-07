import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {addToHistory, deleteTrack, fetchTracks} from "../../store/actions/tracksActions";
import Track from "../../components/Track/Track";
import {publishArtist} from "../../store/actions/artistsActions";

class Tracks extends Component {

    componentDidMount() {
        this.props.match.params.id && this.props.fetchTracks(this.props.match.params.id);
    };

    addToHistory = (id) => {
        this.props.addToHistory(id);
    };

    isVisible = (track) => {
        return track.published || (this.props.user && this.props.user.role === 'admin');
    };

    deleteTrack = (trackId, albumId) => {
        this.props.deleteTrack(trackId, albumId);
    };

    publishTrack = (trackId, albumId) => {
        this.props.publishArtist(trackId, albumId);
    };

    render() {
        return (
            <Fragment>
                <h2>{this.props.artistName}</h2>
                <h5>{this.props.albumTitle}</h5>
                {this.props.tracks.map(track => (
                    this.isVisible(track) && (
                        <Track key={track._id}
                             id={track._id}
                             title={track.title}
                             duration={track.duration}
                             sequence={track.sequence}
                             publish={()=>this.publishTrack(track._id, track.album)}
                             published={track.published}
                             isAdminView={this.props.user && this.props.user.role === 'admin'}
                             deleteTrack={()=>this.deleteTrack(track._id, track.album)}
                             addToHistory={this.addToHistory}
                        />
                    )
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    tracks: state.tracks.tracks,
    artistName: state.tracks.artistName,
    albumTitle: state.tracks.albumTitle,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    fetchTracks: (albumId) => dispatch(fetchTracks(albumId)),
    addToHistory: (trackId) => dispatch(addToHistory(trackId)),
    deleteTrack: (trackId, albumId) => dispatch(deleteTrack(trackId, albumId)),
    publishArtist: (trackId, albumId) => dispatch(publishArtist(trackId, albumId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);