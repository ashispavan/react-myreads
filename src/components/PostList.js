import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {receivePosts} from '../actions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, Icon, Card } from 'semantic-ui-react';
import uuid from 'uuid4';


class PostList extends Component {


    componentDidMount() {
        this.props.receivePosts();
    }


    render() {
        return (
            <div>
            <Link to="/posts/new"><Button primary>Add Post</Button></Link>
            
            <ul style={{listStyleType: 'none'}}>
            {this.props.posts && _.map(this.props.posts, post =>
            
            <Card>   <li key={uuid()}>
                <Link to={`/posts/${post.id}`}><Button>{post.title}</Button></Link>
                <p>{post.body}</p>
                <p>Author: {post.author}</p>
                <Link to={`/${post.category}/posts`}>Category: {post.category}</Link>
                <p>Votes: {post.voteScore}</p>
            </li>
            </Card> 
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
