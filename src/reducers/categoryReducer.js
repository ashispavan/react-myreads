import {FETCH_CATEGORIES} from '../actions';
import _ from 'lodash';

function categoryReducer (categoryState = {}, action) {
    switch(action.type) {
        case FETCH_CATEGORIES:
            console.log('Categories: ', action.payload.data);
            return action.payload.data;
        default:
            return categoryState
    }
}

export default categoryReducer;