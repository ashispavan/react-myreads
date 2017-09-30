import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import uuid from 'uuid4';
import {createPost, fetchCategories} from '../actions';
import {connect} from 'react-redux';
import { Button, Input, Form, Icon } from 'semantic-ui-react';


class PostNew extends Component {

    constructor(){
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchCategories();
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

    renderDropDown(field) {
        return (
            <Form.Field>
                <label>{field.label}</label>
                
                <select  style={{width: '500px', marginLeft: '447px'}}  {...field.input} >
                <option value="">Select category</option>
                {this.props.categories.categories && this.props.categories.categories.map(category => 
                    <option key={category.name} value={category.name}>{category.name}</option>
                )}
                </select>
                <p>{field.meta.touched ? field.meta.error : ''}</p>
            </Form.Field>
        );
    }

    onFormSubmit(values) {
        const defaultFormValues = {
            id: uuid(),
            timestamp: Date.now()
        };
        this.props.createPost({...values, ...defaultFormValues}, () => 
            this.props.history.push('/')
        );
    }


    render() {
        return (
            <div>    
                <Link to="/"><Button positive><Icon name='home' />Home</Button></Link>
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
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
                        name="category"
                        label="Category"
                        component={this.renderDropDown.bind(this)}
                    />
                    <Field
                        name="body"
                        label="Content"
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

    if(!values.title) {
        errors.title = "Please enter a title for the post";
    }
    if(!values.category) {
        errors.category = "Please select a category";
    }
    if(!values.body) {
        errors.body = "Please enter some content";
    }
    if(!values.author) {
        errors.author = "Please enter your name";
    }

    return errors;
}

function mapStateToProps({categories}, ownProps) {
    return {
        categories: categories
    }
}

export default reduxForm({
    form: 'PostNewForm',
    validate
})(connect(mapStateToProps, {createPost, fetchCategories})(PostNew));