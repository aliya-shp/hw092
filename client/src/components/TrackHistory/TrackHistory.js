import React from 'react';
import {Card, CardBody} from "reactstrap";
import PropTypes from 'prop-types';


const TrackHistory = (props) => {
    return (
        <Card style={{marginBottom: '10px'}}>
            <CardBody>
                <div>
                    <p>Track title: <b>{props.title}</b></p>
                    <p>You've listened it at: {props.dateTime}</p>
                    <p>Track Artist: {props.artist}</p>
                </div>
            </CardBody>
        </Card>
    );
};

TrackHistory.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    addToHistory: PropTypes.func.isRequired,
};

export default TrackHistory;