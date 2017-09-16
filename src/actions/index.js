//import * as API from '../utils/api';
import axios from 'axios';

const ROOT_URL = 'http://localhost:5001';




export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_POSTS_CATEGORIES = 'FETCH__POSTS_CATEGORIES';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_POST = 'VOTE_POST';

const headers = {
    headers: { 
        Authorization: 'Random value' 
    }
};



export function receivePosts() {

    const response = axios.get(`${ROOT_URL}/posts`, headers);

    console.log('Action sent: ', response);
    return {
        type: RECEIVE_POSTS,
        payload: response
    }
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts`, values, headers).then(() => callback());

    return {
        type: CREATE_POST,
        payload: values
    }
}

export function editPost(values, id, callback) {
    const request = axios.put(`${ROOT_URL}/posts/${id}`, values, headers).then(() => callback());

    return {
        type: EDIT_POST,
        payload: values
    } 
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}`, headers);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}`, headers).then( () => callback());

    return {
        type: DELETE_POST,
        payload: id
    }
}

export function getPostsByCategories(category) {
    const request = axios.get(`${ROOT_URL}/${category}/posts`, headers);

    return {
        type: FETCH_POSTS_CATEGORIES,
        payload: request
    }
}

export function getComments(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}/comments`, headers);

    return {
        type: FETCH_COMMENTS,
        payload: request
    }
}

export function getSingleComment(id) {
    const request = axios.get(`${ROOT_URL}/comments/${id}`, headers);

    return {
        type: FETCH_COMMENT,
        payload: request
    }
}

export function editComment(values, id, callback) {
    const request = axios.put(`${ROOT_URL}/comments/${id}`, values, headers).then( () => callback());

    return {
        type: EDIT_COMMENT,
        payload: id
    }
}

export function votePost(id, option) {
    const request = axios.post(`${ROOT_URL}/posts/${id}`, option, headers);

    return {
        type: VOTE_POST,
        payload: request
    }
}

// const fetchPosts = () => dispatch => (
//     API.fetchPosts().then(posts => dispatch(receivePosts(posts)))
// );

//export {fetchPosts};