import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import uuid from 'uuid4';
import {editPost, fetchPost} from '../actions';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';



class PostEdit extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPost(id).then(() => this.initializeValues());
    }

    initializeValues() {
        const initData = {
            title: this.props.post.title,
            author: this.props.post.author,
            body: this.props.post.body
          };
      
          this.props.initialize(initData);
    }
    

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
        const id = this.props.match.params.id;
        const defaultFormValues = {
            id: id ? id : uuid(),
            timestamp: Date.now(),
            category: 'react'
        };
        
        this.props.editPost({...values, ...defaultFormValues}, id, () => 
            this.props.history.push('/')
        );
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
            <Button type="submit">Submit</Button>
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

function mapStateToProps({posts}, ownProps) {   
    return {
        post: posts[ownProps.match.params.id]
    }
}

export default reduxForm({
    form: 'PostEditForm',
    validate
})(connect(mapStateToProps, {editPost, fetchPost})(PostEdit));