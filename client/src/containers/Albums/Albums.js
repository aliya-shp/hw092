import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {deleteAlbum, fetchArtistAlbums, publishAlbum} from "../../store/actions/albumsActions";
import Album from "../../components/Album/Album";

class Albums extends Component {

    componentDidMount() {
        this.props.match.params.id && this.props.fetchArtistAlbums(this.props.match.params.id);
    };

    isVisible = (album) => {
        return album.published || (this.props.user && this.props.user.role === 'admin');
    };

    deleteAlbum = (albumId, artistId) => {
        this.props.deleteAlbum(albumId, artistId);
    };

    publishAlbum = (albumId, artistId) => {
        this.props.publishAlbum(albumId, artistId);
    };

    render() {
        return (
            <>
                <h2>{this.props.artistName}</h2>
                {this.props.albums.map(album => (
                    this.isVisible(album) && (
                        <Album key={album._id}
                             _id={album._id}
                             title={album.title}
                             image={album.image}
                             publish={()=>this.publishAlbum(album._id, album.artist)}
                             issueDate={album.issueDate}
                             published={album.published}
                             isAdminView={this.props.user && this.props.user.role === 'admin'}
                             deleteAlbum={()=>this.deleteAlbum(album._id, album.artist)}
                        />
                    )
                ))}
            </>
        );
    }
}

const mapStateToProps = state => ({
    albums: state.albums.albums,
    artistName: state.albums.artistName,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    fetchArtistAlbums: (artistId) => dispatch(fetchArtistAlbums(artistId)),
    deleteAlbum: (albumId, artistId) => dispatch(deleteAlbum(albumId, artistId)),
    publishAlbum: (albumId, artistId) => dispatch(publishAlbum(albumId, artistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);