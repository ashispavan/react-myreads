import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, deletePost, getComments, votePost, deleteComment} from '../actions';
import CommentsList from './CommentsList';
import CommentCount from './CommentCount';
import { Button, Icon, Card, Confirm, Segment } from 'semantic-ui-react';


class PostShow extends Component {

    state = { 
        open: false 
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPost(id);
    }

    deletePost() {
        const id = this.props.match.params.id;
        this.props.deletePost(id, () => this.props.history.push('/'));
    }

    handleConfirm() { 
        this.deletePost();
        this.setState({ open: false });
    }

    handleCancel() { 
        this.setState({ open: false });
    }

    show() {
        this.setState({ open: true });
    }

    
    render() {
        const {post, comments} = this.props;
        const category = this.props.match.params.category;
        const {open} = this.state;
        if (!post) {
            return <div>
            <Link to="/"><Button><Icon name='home' />Home</Button></Link>
            <p>No Posts found</p>
            </div>
        }
        else {
        return (
            <div>
            <Segment>
                <Link to="/"><Button><Icon name='home' />Home</Button></Link>
                <Link to={`/posts/${post.id}/edit`}><Button><Icon name='edit'/>Edit Post</Button></Link>
                <Button color="red" onClick={this.show.bind(this)}><Icon name='delete'/>Delete post</Button>
                <Confirm
                    open={open}
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                    content='Are you sure you want to delete this post?'
                />    
                
                
                <h4>{post.title}</h4>
                <p>Author: {post.author}</p>
                <p>Votes: {post.voteScore}</p>
                <br />
                <p>{post.body}</p>
                <Button icon="thumbs up" label={{content: post.voteScore}} onClick={()=>this.props.votePost(post.id, { option: 'upVote'})}></Button>
                <Button icon="thumbs down" onClick={()=>this.props.votePost(post.id, { option: 'downVote'})}></Button>
                <CommentCount parentId={post.id} />
                <Link to={`/comments/new/${post.id}`}><Button>Add Comment</Button></Link>
            </Segment>
                <CommentsList parentId={post.id} category={category} />
            </div>
        )
        }
    }
}

function mapStateToProps({posts, comments}, ownProps) {   
    return {
        post: posts[ownProps.match.params.id],
        comments: comments
    }
}

export default connect(mapStateToProps, {fetchPost, deletePost, getComments, votePost, deleteComment})(PostShow);