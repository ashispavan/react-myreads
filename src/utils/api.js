import axios from 'axios';
export const fetchPosts = () => axios.get('http://localhost:5001/posts', {
    headers: { Authorization: 'Random value' }
});
//export const fetchPosts = () => fetch('http://localhost:5001/posts');
