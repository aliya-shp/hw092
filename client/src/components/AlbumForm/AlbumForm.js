import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class AlbumForm extends Component {
    state = {
        title: '',
        artist: '' ,
        issueDate: '',
        image: '',
        publisher: this.props.user._id,
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0],
        });
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="artist"
                    title="Artist"
                    type="select" required
                    onChange={this.inputChangeHandler}
                    value={this.state.artist}
                >
                    <option value="">Please select a artist</option>
                    {this.props.artists.map(artist => (
                        <option key={artist._id} value={artist._id}>{artist.name}</option>
                    ))}
                </FormElement>

                <FormElement
                    propertyName="title"
                    title="Title"
                    type="text" required
                    value={this.props.title}
                    onChange={this.inputChangeHandler}
                />

                <FormElement
                    propertyName="issueDate"
                    title="Issue date"
                    type="text" required
                    value={this.props.date}
                    onChange={this.inputChangeHandler}
                />

                <FormElement
                    propertyName="image"
                    title="Album Image"
                    type="file" required
                    onChange={this.fileChangeHandler}
                />

                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default AlbumForm;