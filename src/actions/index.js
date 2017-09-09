//import * as API from '../utils/api';
import axios from 'axios';

const ROOT_URL = 'http://localhost:5001';




export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';



export function receivePosts() {

    const response = axios.get(`${ROOT_URL}/posts`, {
        headers: { Authorization: 'Random value' }
    });

    console.log('Action sent: ', response);
    return {
        type: RECEIVE_POSTS,
        payload: response
    }
}

export function createPost(values) {
    const request = axios.post(`${ROOT_URL}/posts`, values, {
        headers: { Authorization: 'Random value' }
    });

    return {
        type: CREATE_POST,
        payload: values
    }
}

// const fetchPosts = () => dispatch => (
//     API.fetchPosts().then(posts => dispatch(receivePosts(posts)))
// );

//export {fetchPosts};