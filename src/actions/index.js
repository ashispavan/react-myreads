//import * as API from '../utils/api';

import axios from 'axios';


export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';



export default function receivePosts(url) {

    const response = axios.get(url, {
        headers: { Authorization: 'Random value' }
    });

    return {
        type: RECEIVE_POSTS,
        posts: response
    }
}

// const fetchPosts = () => dispatch => (
//     API.fetchPosts().then(posts => dispatch(receivePosts(posts)))
// );

//export {fetchPosts};