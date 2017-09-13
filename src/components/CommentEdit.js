import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import uuid from 'uuid4';
import {getSingleComment, editComment} from '../actions';
import {connect} from 'react-redux';
import { Button, Form, Input, Icon } from 'semantic-ui-react';


class CommentEdit extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSingleComment(id).then(() => this.initializeValues());
    }

    initializeValues() {
        const initData = {
            body: this.props.comment.body,
            author: this.props.comment.author
          };
      
          this.props.initialize(initData);
    }

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
        const id = this.props.match.params.id;
        const parentId = this.props.comment.parentId;
        const defaultFormValues = {
            id: id ? id : uuid(),
            timestamp: Date.now()
        };
        
        this.props.editComment({...values, ...defaultFormValues}, id, () => 
            this.props.history.push(`/posts/${parentId}`)
        );
    }
    

    render() {
        const parentId = this.props.comment.parentId;
        return (
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
            <Field
                name="body"
                label="Comment"
                component={this.renderField}
            />
            <Field
                name="author"
                label="Author"
                component={this.renderField}
            />
            <Button type="submit">Submit</Button>
            <Link to={`/posts/${parentId}`}><Button>Cancel</Button></Link>
            </Form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.body) {
        errors.title = "Please enter a comment";
    }

    return errors;
}

function mapStateToProps({comments}, ownProps) {   
    return {
        comment: comments[ownProps.match.params.id]
    }
}

export default reduxForm({
    form: 'CommentEditForm',
    validate
})(connect(mapStateToProps, {getSingleComment, editComment})(CommentEdit));