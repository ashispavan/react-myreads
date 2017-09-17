import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { getComments, deleteComment, voteComment} from '../actions';
import { Button, Icon, Card } from 'semantic-ui-react';
import _ from 'lodash';
import uuid from 'uuid4';


class CommentsList extends Component {

    componentDidMount() {
        const parentId = this.props.parentId;
        this.props.getComments(parentId);
    }
    

    render() {
        return (
            <ul style={{listStyleType: 'none'}}>
            {this.props.comments && _.map(this.props.comments, comment =>
                
                <Card key={uuid()}>   
                    <li key={uuid()}>
                    <Card.Header>{comment.body}</Card.Header>
                    <Card.Meta>Author: {comment.author}</Card.Meta>
                    <Link to={`/comments/edit/${comment.id}`}><Button>Edit</Button></Link>
                    <Button color="red" onClick={() => 
                        this.props.deleteComment(comment.id)}>
                    <Icon name="delete"></Icon>Delete
                    </Button>
                    <Button content="Like" icon="thumbs up" label={{content: comment.voteScore}} onClick={()=>this.props.voteComment(comment.id, { option: 'upVote'})}></Button>
                    <Button icon="thumbs down" onClick={()=>this.props.voteComment(comment.id, { option: 'downVote'})}></Button>
                    </li>
                </Card> 
                )}
            </ul>
        );
    }
}

function mapStateToProps({comments}, ownProps) {   
    return {
        comments: comments,
        parentId: ownProps.parentId
    }
}

export default connect(mapStateToProps, {getComments, deleteComment, voteComment})(CommentsList);



