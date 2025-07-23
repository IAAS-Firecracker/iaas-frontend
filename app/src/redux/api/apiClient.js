import axios from 'axios';
import { store } from '../store';

// Create axios instance with base URL
const AUTH_SERVICE = 'USER-SERVICE';

const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    }
});


// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Get the token from store 
        const state = store.getState();
        const token = state.user.token;

        // If token exists, add to headers
        if(token) {
            config.headers.userorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 (Unauthorized) and not already retrying
        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get the refresh token
                const state = store.getState();
                const refreshToken = state.user.refreshToken;

                if (!refreshToken) {
                    // No refresh token, redirect to login
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // Attempt to refresh the token
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/${AUTH_SERVICE}/token/refresh/`,
                    { refresh: refreshToken }
                );

                const { access } = response.data;

                // Update the token in the store ( this will need to dispatch action )
                
                store.dispatch({ type: 'user/tokenRefreshed', payload: access});

                // Update the authorization header
                originalRequest.headers.userorization = `Bearer ${access}`;

                // Retry the original request
                return apiClient(originalRequest);
            }
            catch (refreshError) {
                // If refresh fails, redirect to login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;