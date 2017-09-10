import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPostsByCategories} from '../actions';
import {Link} from 'react-router-dom';
import _ from 'lodash';


class PostsByCategory extends Component {
    
    componentDidMount() {
        const category = this.props.match.params.category;
        this.props.getPostsByCategories(category);
    }
    
    
    render() {
        return(
            <ul style={{listStyleType: 'none'}}>
            {this.props.posts && _.map(this.props.posts, post =>
            <li key={post.title}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <p>{post.body}</p>
                <p>Author: {post.author}</p>
                <p>Category: {post.category}</p>
                <p>Votes: {post.voteScore}</p>
            </li>
            )}
            </ul>
        );
    }


}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, {getPostsByCategories})(PostsByCategory);