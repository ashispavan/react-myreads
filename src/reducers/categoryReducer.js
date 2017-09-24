import {FETCH_CATEGORIES} from '../actions';

function categoryReducer (categoryState = {}, action) {
    switch(action.type) {
        case FETCH_CATEGORIES:
            return action.payload.data;
        default:
            return categoryState
    }
}

export default categoryReducer;