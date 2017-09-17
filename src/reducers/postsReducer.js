import {RECEIVE_POSTS, FETCH_POST, FETCH_POSTS_CATEGORIES, VOTE_POST, SORT_BY_DATE, SORT_BY_VOTE} from '../actions';
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
            return {...postState, [action.payload.data.id]: action.payload.data};
        case SORT_BY_DATE:
            const postsByDate = _.sortBy(action.payload.data, 'timestamp').reverse();
            return _.mapKeys(postsByDate, 'id');
        case SORT_BY_VOTE:
            const postsByVote = _.sortBy(action.payload.data, 'voteScore').reverse();
            return _.mapKeys(postsByVote, 'id'); 
        default:
            return postState;


    }

}

export default postsReducer;