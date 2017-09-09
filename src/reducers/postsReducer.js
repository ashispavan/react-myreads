import {RECEIVE_POSTS}   from '../actions';
import _ from 'lodash';


function postsReducer (postState = {}, action) {

    const allPosts = action.payload;
    
    switch(action.type) {
        case RECEIVE_POSTS: 
            return _.mapKeys(allPosts.data, 'id');
        default:
            return postState;
    }
}

export default postsReducer;