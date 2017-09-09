import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class BookList extends Component {
    render() {
        return (
            <div>
            <Link to="/posts/new">Add Post</Link>
            
            <ul style={{listStyleType: 'none'}}>
            {this.props.posts && _.map(this.props.posts, post =>
            <li key={post.title}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <p>Author: {post.author}</p>
                <p>Votes: {post.voteScore}</p>
            </li>
            )}
            </ul>
            </div>
        );
    }
}

export default BookList;