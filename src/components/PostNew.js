import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import uuid from 'uuid4';
import {createPost} from '../actions';
import {connect} from 'react-redux';
import { Button, Input, Form, Icon } from 'semantic-ui-react';


class PostNew extends Component {

    renderField(field) {
        return (
            <Form.Field>
                <label>{field.label}</label>
                <Input style={{width: '500px'}} type="text" {...field.input} />
                <p>{field.meta.touched ? field.meta.error : ''}</p>
            </Form.Field>
        );
    }

    onFormSubmit(values) {
        const defaultFormValues = {
            id: uuid(),
            timestamp: Date.now(),
            category: 'react'
        };
        this.props.createPost({...values, ...defaultFormValues}, () => 
            this.props.history.push('/')
        );
    }


    render() {
        return (
            <div>
            
            <Link to="/"><Button><Icon name='home' />Home</Button></Link>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
            <Field
                name="title"
                label="Title"
                component={this.renderField}
            />
            <Field
                name="author"
                label="Author"
                component={this.renderField}
            />
            <Field
                name="body"
                label="Content"
                component={this.renderField}
            />
            <Button type="submit">Submit</Button>
            </Form>
            
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = "Please enter a title for the post";
    }

    return errors;
}

export default reduxForm({
    form: 'PostNewForm',
    validate
})(connect(null, {createPost})(PostNew));