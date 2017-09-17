import {COMMENT_COUNT} from '../actions';

function commentCountReducer(countState = {}, action) {
    switch(action.type) {
        case COMMENT_COUNT:
        const parentId = action.meta;
            return  {...countState, [parentId]: action.payload.data};
        default:
            return countState;
    }
}

export default commentCountReducer;