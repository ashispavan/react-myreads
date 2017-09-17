import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {receivePosts, getPostsByCategories, votePost, sortPosts, fetchCategories} from '../actions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, Icon, Card } from 'semantic-ui-react';
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


        

        return (
            
            <div>
            {category && <Link to="/"><Button><Icon name='home' />Home</Button></Link>}
            <Link to="/posts/new"><Button primary>Add Post</Button></Link>
            {!category && 
                <select onChange={(event) => {
                    this.props.sortPosts(event.target.value)
                }}>
                    <option disabled defaultValue>Sort</option>
                    <option value="votes">Top Votes</option>
                    <option value="date">Most Recent</option>
                </select>
            }
            
            <div>
            {   
                this.props.categories.categories && this.props.categories.categories.map(item =>
                (!category && <Link key={item.name} to={`/${item.name}/posts`}><Button><Icon name='tag' />{item.name}</Button></Link>)
                
            )}
            </div>

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
                <CommentCount parentId={post.id} />
                <Button icon="thumbs up" label={{content: post.voteScore}} onClick={()=>this.vote(post.id, 'upVote')}></Button>
                <Button icon="thumbs down" onClick={()=>this.vote(post.id, 'downVote')}></Button>
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
      posts: state.posts,
      categories: state.categories
    }
}

export default withRouter(
    connect(mapStateToProps, {receivePosts, getPostsByCategories, votePost, sortPosts, fetchCategories})(PostList));
