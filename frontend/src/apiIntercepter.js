import axios from 'axios';

const server = 'http://localhost:5000';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if(parts.length === 2) return parts.pop().split(';').shift();
}

const api = axios.create({
  baseURL: server,
  withCredentials: true,

});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) =>{
  failedQueue.forEach((prom) =>{
    if(error){
      prom.reject(error);
    }else{
      prom.resolve(token);
    }
  })
  failedQueue = [];
};

api.interceptors.response.use(
  (response)=>response,
  async(error) =>{
    const originalRequest = error.config;

    if(error.response.status === 403 && !originalRequest._retry){
      if(isRefreshing){
        return new Promise((resolve, reject)=>{
          failedQueue.push({resolve, reject});
        }).then(()=>{
          return api(originalRequest);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try{
        await api.post("/api/v1/refresh");
        processQueue(null);
        return api(originalRequest);
      }catch(err){
        processQueue(err);
        return Promise.reject(err);
      }finally{
        isRefreshing = false;
      }

      return Promise.reject(error);
    }
  });

  export default api;
