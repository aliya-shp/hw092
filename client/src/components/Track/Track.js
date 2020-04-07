import React from 'react';
import {Button, Card, CardBody} from "reactstrap";
import PropTypes from 'prop-types';

const Track = (props) => {
    return (
        <Card className='Card'>
            <CardBody>
                <div>
                    <p><b>{props.title}</b></p>
                    <p>Duration: {props.duration}</p>
                    <p>Track Number: {props.sequence}</p>
                </div>
                <Button onClick={()=>props.addToHistory(props.id)}>Add to history</Button>
            </CardBody>
            { props.isAdminView && (<div>
                <div><Button onClick={props.deleteTrack} className='Artist-btn btn-danger'>Delete</Button></div>
                { !props.published && <div><Button onClick={props.publishTrack} className='Artist-btn'>Publish</Button></div> }
            </div>) }
        </Card>
    );
};

Track.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    addToHistory: PropTypes.func.isRequired,
};

export default Track;