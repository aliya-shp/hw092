import React from 'react';
import Thumbnail from "../Thumbnail/Thumbnail";
import {Link} from "react-router-dom";
import {Button, Card, CardBody} from "reactstrap";
import PropTypes from 'prop-types';

const Artist = (props) => {
    return (
        <Card className='Card'>
            <CardBody>
                <Thumbnail image={props.photo}/>
                <Link to={'/artists/' + props._id}>
                    {props.name}
                </Link>
                { !props.published && <div><i>Not published yet!</i></div> }
            </CardBody>
            { props.isAdminView && (<div>
                <div><Button onClick={props.deleteArtist} className='Artist-btn btn-danger'>Delete</Button></div>
                { !props.published && <div><Button onClick={props.publishArtist} height="40px" width="100px" style={{marginBottom: "10px", marginRight: "10px"}}>Publish</Button></div> }
            </div>)
            }
        </Card>
    );
};

Artist.propTypes = {
    image: PropTypes.string,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
};

export default Artist;