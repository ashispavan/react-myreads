import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';



class PostShow extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPost(id);
    }
    
    render() {
        const {post} = this.props;
        if (!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/">Home</Link>
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

export default connect(mapStateToProps, {fetchPost})(PostShow);