import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const fallbackURL = "https://oss-backend.vercel.app/api/anubhav";

export const BACKEND_URL = process.env.VITE_BACKEND_URL || fallbackURL;

// Create axios instance with default configuration
const api: AxiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false,
});

// Request interceptor to add common headers or handle requests
api.interceptors.request.use(
    (config) => {
        // You can add authentication tokens here if needed
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common responses and errors
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                url: error.config?.url,
            });
            
            // Handle specific error codes
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    console.error('Unauthorized access');
                    break;
                case 403:
                    // Handle forbidden
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Handle not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Handle server error
                    console.error('Server error');
                    break;
                default:
                    console.error(`HTTP Error: ${error.response.status}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network error - no response received');
        } else {
            // Something else happened
            console.error('Request setup error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

// API methods
export const apiService = {
    // Blogs
    getBlogs: async (page: number = 1, limit: number = 10) => {
        const response = await api.get('/blogs', { params: { page, limit } });
        return response.data;
    },
    
    getLatestBlogs: async () => {
        const response = await api.get('/blogs', { params: { useLatest: true } });
        return response.data;
    },
    
    getBlogById: async (id: string) => {
        const response = await api.get(`/blog/${id}`);
        return response.data;
    },
    
    createBlog: async (blogData: any) => {
        const response = await api.post('/blogs', blogData);
        return response.data;
    },
    
    // Search
    searchBlogs: async (query: string, page: number = 1, limit: number = 10) => {
        const response = await api.get('/search', { params: { q: query, page, limit } });
        return response.data;
    },
    
    getSimilarBlogs: async (params?: { q?: string; company?: string; tags?: string; blogId?: string }) => {
        const response = await api.get('/similarBlogs', { params });
        return response.data;
    },
    
    // Companies
    getCompanies: async () => {
        const response = await api.get('/countCompanies');
        return response.data;
    },
    
    getAllCompanies: async () => {
        const response = await api.get('/companies');
        return response.data;
    },
    
    // Tags
    getTags: async () => {
        const response = await api.get('/tags');
        return response.data;
    },
    
    // Requests
    createArticleRequest: async (requestData: any) => {
        const response = await api.post('/reqarticle', requestData);
        return response.data;
    },
    
    sendRequest: async (requestData: any) => {
        const response = await api.post('/reqarticle', requestData);
        return response.data;
    },
    
    // Generic GET method
    get: (url: string, config?: AxiosRequestConfig) => 
        api.get(url, config),
    
    // Generic POST method
    post: (url: string, data?: any, config?: AxiosRequestConfig) => 
        api.post(url, data, config),
    
    // Generic PUT method
    put: (url: string, data?: any, config?: AxiosRequestConfig) => 
        api.put(url, data, config),
    
    // Generic DELETE method
    delete: (url: string, config?: AxiosRequestConfig) => 
        api.delete(url, config),
};

// Export the axios instance for custom usage
export { api };

// Export types for better TypeScript support
export type ApiResponse<T = any> = AxiosResponse<T>;
export type ApiError = any; 