import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import uuid from 'uuid4';
import {createComment} from '../actions';
import {connect} from 'react-redux';
import { Button, Input, Form, Icon } from 'semantic-ui-react';


class CommentNew extends Component {

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
        const parentId = this.props.match.params.parentId;
        const defaultFormValues = {
            id: uuid(),
            timestamp: Date.now(),
            parentId: parentId
        };
        this.props.createComment({...values, ...defaultFormValues}, () => 
            this.props.history.push(`/posts/${parentId}`)
        );
    }


    render() {
        return (
            <div>
            
            <Link to="/"><Button positive><Icon name='home' />Home</Button></Link>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
            <Field
                name="body"
                label="Content"
                component={this.renderField}
            />
            <Field
                name="author"
                label="Author"
                component={this.renderField}
            />
            <Button primary type="submit">Submit</Button>
            </Form>
            
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.body) {
        errors.body = "Please enter a comment";
    }
    if(!values.author) {
        errors.author = "Please enter your name"
    }

    return errors;
}

export default reduxForm({
    form: 'CommentNewForm',
    validate
})(connect(null, {createComment})(CommentNew));