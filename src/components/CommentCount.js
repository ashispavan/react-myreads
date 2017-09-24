import React, {Component} from 'react';
import _ from 'lodash';
import {getCommentCount} from '../actions';
import {connect} from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';


class CommentCount extends Component {

    componentDidMount() {
        const parentId = this.props.parentId;
        this.props.getCommentCount(parentId);
    }

    render() {
        const parentId = this.props.parentId;
        const noOfComments = this.props.commentCount ? _.size(this.props.commentCount[parentId]) : 0;
        return (
            <p className="commentCount"><Icon name="comments"></Icon> {noOfComments}</p>
        );
    }
    
}

function mapStateToProps({commentCount}, ownProps) {

    return {
        commentCount: commentCount,
        parentId: ownProps.parentId
    }
}

export default connect(mapStateToProps, {getCommentCount})(CommentCount);