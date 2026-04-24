import axios from 'axios';

const server = 'http://localhost:5000';

const api = axios.create({
  baseURL: server,
  withCredentials: true,

});

let isRereshing = false;
let failedQueue = [];