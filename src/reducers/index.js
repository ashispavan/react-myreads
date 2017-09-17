import {combineReducers} from 'redux';
import PostsReducer from './postsReducer';
import CommentsReducer from './commentsReducer';
import CategoryReducer from './categoryReducer';
import CommentCountReducer from './commentCountReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    posts: PostsReducer,
    comments: CommentsReducer,
    categories: CategoryReducer,
    commentCount: CommentCountReducer,
    form: formReducer
});

export default rootReducer;