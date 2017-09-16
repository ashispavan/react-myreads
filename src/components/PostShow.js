import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, deletePost, getComments, votePost} from '../actions';
import { Button, Icon, Card } from 'semantic-ui-react';
import _ from 'lodash';
import uuid from 'uuid4';



class PostShow extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPost(id);
        this.props.getComments(id);
    }

    deletePost() {
        const id = this.props.match.params.id;
        this.props.deletePost(id, () => this.props.history.push('/'));
    }


    
    render() {
        const {post, comments} = this.props;
        if (!post || !comments) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/"><Button><Icon name='home' />Home</Button></Link>
                <Button color="red" onClick={this.deletePost.bind(this)}>Delete post</Button>
                
                <Link to={`/posts/${post.id}/edit`}><Button>Edit Post</Button></Link>
                
                <h4>{post.title}</h4>
                <p>Author: {post.author}</p>
                <p>Votes: {post.voteScore}</p>
                <br />
                <p>{post.body}</p>
                <Button onClick={()=>this.props.votePost(post.id, { option: 'upVote'})}>Upvote</Button>
                <Button onClick={()=>this.props.votePost(post.id, { option: 'downVote'})}>Downvote</Button>

                <h2>Comments</h2>

                <ul style={{listStyleType: 'none'}}>
                {this.props.comments && _.map(this.props.comments, comment =>
                    
                    <Card key={uuid()}>   
                        <li key={uuid()}>
                        <Card.Header>{comment.body}</Card.Header>
                        <Card.Meta>Author: {comment.author}</Card.Meta>
                        <p>Votes: {comment.voteScore}</p>
                        <Link to={`/comments/edit/${comment.id}`}><Button>Edit</Button></Link>
                        </li>
                    </Card> 
                    )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({posts, comments}, ownProps) {   
    return {
        post: posts[ownProps.match.params.id],
        comments: comments
    }
}

export default connect(mapStateToProps, {fetchPost, deletePost, getComments, votePost})(PostShow);