import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-bb.firebaseio.com/'
});

export default instance;