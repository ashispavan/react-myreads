import {RECEIVE_POSTS, FETCH_POST, FETCH_POSTS_CATEGORIES}   from '../actions';
import _ from 'lodash';


function postsReducer (postState = {}, action) {

    const allPosts = action.payload;
    
    switch(action.type) {
        case RECEIVE_POSTS: 
            const posts = _.mapKeys(allPosts.data, 'id');
            return _.filter(posts, (post) => !post.deleted);
        case FETCH_POST:
            return {...postState, [action.payload.data.id]: action.payload.data};
        case FETCH_POSTS_CATEGORIES:
            const postsByCategory = _.mapKeys(allPosts.data, 'id');
            return postsByCategory;
        default:
            return postState;


    }

}

export default postsReducer;