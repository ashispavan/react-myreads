import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import uuid from 'uuid4';
import {createPost} from '../actions';
import {connect} from 'react-redux';


class PostNew extends Component {

    renderField(field) {
        return (
            <div>
                <label>{field.label}</label>
                <input type="text" {...field.input} />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        );
    }

    onFormSubmit(values) {
        const defaultFormValues = {
            id: uuid(),
            timestamp: Date.now(),
            category: 'react'
        };
        this.props.createPost({...values, ...defaultFormValues});
    }


    render() {
        return (
            <div>
            <Link to="/">Home</Link>
            <form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
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
            <button type="submit">Submit</button>
            </form>
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