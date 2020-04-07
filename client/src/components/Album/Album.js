import React from 'react';
import Thumbnail from "../Thumbnail/Thumbnail";
import {Link} from "react-router-dom";
import {Button, Card, CardBody, CardText} from "reactstrap";
import PropTypes from 'prop-types';

const getYear = (timestamp) => {
    const date = new Date(timestamp);
    return date.getFullYear();
};

const Album = (props) => {
    return (
        <Card className='Card'>
            <CardBody style={{ display: 'flex' }}>
                <Thumbnail image={props.image}/>
                <div>
                    <Link to={'/albums/' + props._id} onClick={(e) => props.getAlbumTitle(props.title)}>
                        {props.title}
                    </Link>
                    <CardText>Issued at: {getYear(props.issueDate)}</CardText>
                    { !props.published && <div><i>Not published yet!</i></div> }
                </div>
            </CardBody>
            { props.isAdminView && (<div>
                <div><Button onClick={props.deleteAlbum} className='Artist-btn btn-danger'>Delete</Button></div>
                { !props.published && <div><Button onClick={props.publishAlbum} className='Artist-btn'>Publish</Button></div> }
            </div>) }
        </Card>
    );
};

Album.propTypes = {
    title: PropTypes.string,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    photo: PropTypes.string,
    issueDate: PropTypes.string
};

export default Album;