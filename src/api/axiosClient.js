import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase';

const getFireBaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) return currentUser.getIdToken;

    return new Promise((resolve, reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
            console.log('doi 5s')
        }, 5000)
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                reject(null)
            }
            if (user) {
                const token = await user.getIdToken();
                resolve(token);
            }
            unregisterAuthObserver()
            clearTimeout(waitTimer)
        });
    })
}
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_HEROKU,
    header: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ... 
    // const currentUser = firebase.auth().currentUser;
    // if (currentUser) {
    //     const token = await currentUser.getIdToken();
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    const token = await getFireBaseToken();

    console.log('Authorization:', token)

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config)
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response;
}, (error) => {
    // Handle errors
    throw error
});

export default axiosClient;
