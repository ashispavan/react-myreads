import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {receivePosts, getPostsByCategories, votePost, sortPosts, fetchCategories} from '../actions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, Icon, Card, Segment, Dropdown } from 'semantic-ui-react';
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
                text:'Most Recent', 
                value: 'date'
            }
        );

        return (
            
            <div>
            {category && <Link to="/"><Button><Icon name='home' />Home</Button></Link>}
            <Link to="/posts/new"><Button primary>Add Post</Button></Link>
            {!category && 
                <Dropdown placeholder='Sort by:' fluid selection onChange={(event) => {
                    this.props.sortPosts(event.target.value)
                }} options={sortOptions}>
                </Dropdown>
            }
            
            <div>
            {   
                this.props.categories.categories && this.props.categories.categories.map(item =>
                (!category && <Link key={item.name} to={`/${item.name}`}><Button><Icon name='tag' />{item.name}</Button></Link>)
                
            )}
            </div>
            
            {this.props.posts && _.map(this.props.posts, post =>
            (!post.deleted &&
            <Segment raised key={uuid()}>   
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                <p>Author: {post.author}</p>
                <Link to={`/${post.category}`}>Category: {post.category}</Link>
                <p>Created: {new Date(post.timestamp).toDateString()}</p>
                <CommentCount parentId={post.id} />
                <Button icon="thumbs up" label={{content: post.voteScore}} onClick={()=>this.vote(post.id, 'upVote')}></Button>
                <Button icon="thumbs down" onClick={()=>this.vote(post.id, 'downVote')}></Button>
            </Segment>) 
            )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('map state: ', state);
    return {
      posts: state.posts,
      categories: state.categories
    }
}

export default withRouter(
    connect(mapStateToProps, {receivePosts, getPostsByCategories, votePost, sortPosts, fetchCategories})(PostList));
