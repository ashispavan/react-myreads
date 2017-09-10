import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import { Button, Icon } from 'semantic-ui-react';



class PostShow extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPost(id);
    }

    deletePost() {
        const id = this.props.match.params.id;
        this.props.deletePost(id, () => this.props.history.push('/'));
    }
    
    render() {
        const {post} = this.props;
        if (!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/">Home</Link>
                <button onClick={this.deletePost.bind(this)}>Delete post</button>
                
                <Link to={`/posts/${post.id}/edit`}><Button>Edit Post</Button></Link>
                
                <h4>{post.title}</h4>
                <p>Author: {post.author}</p>
                <br />
                <p>{post.body}</p>
            </div>
        )
    }
}

function mapStateToProps({posts}, ownProps) {   
    return {
        post: posts[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);