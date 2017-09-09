import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {receivePosts} from '../actions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class PostList extends Component {


    componentDidMount() {
        this.props.receivePosts();
    }


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
                <p>Category: {post.category}</p>
                <p>Votes: {post.voteScore}</p>
            </li>
            )}
            </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('map state: ', state);
    return {
      posts: state.posts
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
      receivePosts: () => dispatch(receivePosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
