import {combineReducers} from 'redux';
import PostsReducer from './postsReducer';
import CommentsReducer from './commentsReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    posts: PostsReducer,
    comments: CommentsReducer,
    form: formReducer
});

export default rootReducer;