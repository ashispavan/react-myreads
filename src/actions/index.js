//import * as API from '../utils/api';
import axios from 'axios';

const ROOT_URL = 'http://localhost:5001';




export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';



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

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts`, values, {
        headers: { Authorization: 'Random value' }
    }).then(() => callback());

    return {
        type: CREATE_POST,
        payload: values
    }
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}`, {
        headers: { Authorization: 'Random value' }
    });

    return {
        type: FETCH_POST,
        payload: request
    }
}

// const fetchPosts = () => dispatch => (
//     API.fetchPosts().then(posts => dispatch(receivePosts(posts)))
// );

//export {fetchPosts};