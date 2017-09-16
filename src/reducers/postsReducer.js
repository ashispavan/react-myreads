import {RECEIVE_POSTS, FETCH_POST, FETCH_POSTS_CATEGORIES, VOTE_POST}   from '../actions';
import _ from 'lodash';


function postsReducer (postState = {}, action) {

    const allPosts = action.payload;
    
    switch(action.type) {
        case RECEIVE_POSTS: 
            const posts = _.mapKeys(allPosts.data, 'id');
            return posts;
        case FETCH_POST:
            return {...postState, [action.payload.data.id]: action.payload.data};
        case FETCH_POSTS_CATEGORIES:
            const postsByCategory = _.mapKeys(allPosts.data, 'id');
            return postsByCategory;
        case VOTE_POST:
            return {...postState, [action.payload.data.id]: action.payload.data}
        default:
            return postState;


    }

}

export default postsReducer;