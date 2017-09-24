import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getComments, deleteComment, voteComment} from '../actions';
import { Button, Icon, Card, Comment, Header } from 'semantic-ui-react';
import _ from 'lodash';
import uuid from 'uuid4';
import user from '../matt.jpg';


class CommentsList extends Component {

    componentDidMount() {
        const parentId = this.props.parentId;
        this.props.getComments(parentId);
    }
    

    render() {
        return (
            <Comment.Group>
            <Header as='h3' dividing>Comments</Header>
            {this.props.comments && _.map(this.props.comments, comment =>
                
                <Comment key={uuid()}>
                <Comment.Avatar src={user} />   
                    <Comment.Content key={uuid()}>
                    <Comment.Author>{comment.author}<Comment.Metadata><Icon name="heart" color="red" />{comment.voteScore}</Comment.Metadata></Comment.Author>
                    <Comment.Text>{comment.body}</Comment.Text>
                    
                    <Comment.Actions>
                        <Link to={`/comments/edit/${comment.id}`}>Edit</Link>
                        <Comment.Action onClick={() => 
                            this.props.deleteComment(comment.id)}>
                            Delete
                        </Comment.Action>
                        <Comment.Action onClick={()=>this.props.voteComment(comment.id, { option: 'upVote'})}><Icon size="large" name="thumbs up" /></Comment.Action>
                        <Comment.Action onClick={()=>this.props.voteComment(comment.id, { option: 'downVote'})}><Icon size="large" name="thumbs down" /></Comment.Action>
                    </Comment.Actions>
                    </Comment.Content>
                </Comment> 
                )}
            </Comment.Group>
        );
    }
}

function mapStateToProps({comments}, ownProps) {   
    return {
        comments: comments,
        parentId: ownProps.parentId,
        category: ownProps.category
    }
}

export default withRouter(connect(mapStateToProps, {getComments, deleteComment, voteComment})(CommentsList));



