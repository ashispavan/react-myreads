import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {receivePosts, getPostsByCategories, votePost, sortPosts} from '../actions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, Icon, Card } from 'semantic-ui-react';
import uuid from 'uuid4';


class PostList extends Component {


    componentDidMount() {
        const category = this.props.match.params.category;
        category ? this.props.getPostsByCategories(category) : this.props.receivePosts();
    }

    vote(id, option) {
        this.props.votePost(id, {option: option});
    }


    render() {
        return (
            <div>
            <Link to="/"><Button><Icon name='home' />Home</Button></Link>
            <Link to="/posts/new"><Button primary>Add Post</Button></Link>
            <select onChange={(event) => {
                this.props.sortPosts(event.target.value)
            }}>
                <option disabled selected="selected">Sort</option>
                <option value="votes">Top Votes</option>
                <option value="date">Most Recent</option>
            </select>
            <ul style={{listStyleType: 'none'}}>
            <Card.Group>
            {this.props.posts && _.map(this.props.posts, post =>
            (!post.deleted &&
            <Card key={uuid()}>   
                <li key={uuid()}>
                <Card.Header><Link to={`/posts/${post.id}`}>{post.title}</Link></Card.Header>
                <Card.Meta>{post.body}</Card.Meta>
                <p>Author: {post.author}</p>
                <Link to={`/${post.category}/posts`}>Category: {post.category}</Link>
                <p>Created: {new Date(post.timestamp).toDateString()}</p>
                <p>Votes: {post.voteScore}</p>
                <Button onClick={()=>this.vote(post.id, 'upVote')}>Upvote</Button>
                <Button onClick={()=>this.vote(post.id, 'downVote')}>Downvote</Button>
                </li>
            </Card>) 
            )}
            </Card.Group>
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
  
// function mapDispatchToProps(dispatch) {
//     return {
//       receivePosts: () => dispatch(receivePosts())
//     }
// }

export default withRouter(
    connect(mapStateToProps, {receivePosts, getPostsByCategories, votePost, sortPosts})
    (PostList));
