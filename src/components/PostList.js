import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {receivePosts, getPostsByCategories, deletePost, votePost, sortPosts, fetchCategories} from '../actions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, Icon, Segment, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid4';
import CommentCount from './CommentCount';


class PostList extends Component {


    componentDidMount() {
        const category = this.props.match.params.category;
        category ? this.props.getPostsByCategories(category) : this.props.receivePosts();
        this.props.fetchCategories();
    }

    vote(id, option) {
        this.props.votePost(id, {option: option});
    }


    render() {
        const category = this.props.match.params.category;
        const sortOptions = [];
        sortOptions.push({
                text:'Vote Score',
                value: 'vote'
            },
            {
                text:'Date', 
                value: 'date'
            }
        );

        return (
            
            <div>
                {category && <Link to="/"><Button positive><Icon name='home' />Home</Button></Link>}
                <div>
                    {!category && <Link className="addPost" to="/posts/new"><Button primary>Add Post</Button></Link>}
                    {!category && 
                        <Dropdown placeholder='Sort by:' fluid selection onChange={(event, {value}) => {
                            this.props.sortPosts(value)
                        }} options={sortOptions}>
                        </Dropdown>
                    }
                </div>
                <div>
                
                {   
                    this.props.categories.categories && this.props.categories.categories.map(item =>
                    (!category && <Link key={item.name} to={`/${item.name}`}><Button><Icon name='tag' />{item.name}</Button></Link>) 
                )}
                </div>
            
                {this.props.posts && _.map(this.props.posts, post =>
                (!post.deleted &&
                <Segment raised key={uuid()}>   
                    <Link className="title" to={`/${post.category}/${post.id}`}>{post.title}</Link>
                    <p>Author: {post.author}</p>
                    <Link to={`/${post.category}`}>Category: {post.category}</Link>
                    <p>Created: {new Date(post.timestamp).toDateString()}</p>
                    <CommentCount parentId={post.id} />
                    <div className="postActions">
                        <Link to={`/posts/${post.id}/edit`}><Button size='mini'><Icon name='edit'/>Edit post</Button></Link>
                        <Button size='mini' color="red" onClick={() => this.props.deletePost(post.id, () => this.props.receivePosts())}><Icon name='delete'/>Delete post</Button>                    
                    </div>
                    <Button.Group className="voteButtons">
                    <Button compact size='mini' icon="thumbs up" primary onClick={()=>this.vote(post.id, 'upVote')}></Button>
                    <Button.Or text={post.voteScore} />
                    <Button compact size='mini' icon="thumbs down" onClick={()=>this.vote(post.id, 'downVote')}></Button>
                    </Button.Group>
                    
                </Segment>) 
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      posts: state.posts,
      categories: state.categories
    }
}

export default withRouter(
    connect(mapStateToProps, {receivePosts, getPostsByCategories, deletePost, votePost, sortPosts, fetchCategories})(PostList));
