import {combineReducers} from 'redux';
import PostsReducer from './postsReducer';
import CommentsReducer from './commentsReducer';
import CategoryReducer from './categoryReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    posts: PostsReducer,
    comments: CommentsReducer,
    categories: CategoryReducer,
    form: formReducer
});

export default rootReducer;