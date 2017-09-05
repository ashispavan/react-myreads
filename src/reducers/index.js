import RECEIVE_POSTS from '../actions';


function postsReducer (postState = [], action) {

    const allPosts = action.posts;
    
    switch(action.type) {
        case RECEIVE_POSTS: 
            console.log(allPosts);
            return allPosts;
        default:
            return postState;
    }
}

export default postsReducer;