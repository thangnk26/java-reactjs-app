import axios from 'axios';
// import https from 'https';

const request = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
    // httpsAgent: new https.Agent({
    //     rejectUnauthorized: false,
    // }),
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Referrer-Policy': 'unsafe_url',
    // },
});

// request.interceptors.request.use(
//     async (config) => {
//         const token = JSON.parse(localStorage.getItem('user'));
//         if (token) {
//             config.headers.Authorization = `Bearer ${token.accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

// request.interceptors.response.use(
//     (response) => {
//         if (response && response.data) {
//             return response.data;
//         }
//         return response;
//     },
//     (error) => {
//         // Handle errors
//         throw error;
//     },
// );

export default request;
