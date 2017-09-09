import {RECEIVE_POSTS, FETCH_POST}   from '../actions';
import _ from 'lodash';


function postsReducer (postState = {}, action) {

    const allPosts = action.payload;
    
    switch(action.type) {
        case RECEIVE_POSTS: 
            return _.mapKeys(allPosts.data, 'id');
        case FETCH_POST:
            return {...postState, [action.payload.data.id]: action.payload.data};
        default:
            return postState;


    }

}

export default postsReducer;