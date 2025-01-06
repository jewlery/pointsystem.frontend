import axios from 'axios';

// Get the current subdomain
const hostname = window.location.hostname;
let subdomain = hostname.split('.')[0]; // Extract the subdomain from the hostname
let domain = hostname.split('.')[1]; // Extract the subdomain from the hostname

// Determine the base URL based on the subdomain
let BASE_URL;
if (process.env["build"] === 'dev') {
    BASE_URL = 'http://127.0.0.1:8000'; // Development API base URL
} else {
    if (subdomain === 'payment-showroom') {
        BASE_URL = 'https://payment-api-showroom.' + domain;
    } else if (subdomain === 'payment-atlas') {
        BASE_URL = 'https://payment-api-atlas.' + domain;
    } else {
        // Default to a fallback base URL
        BASE_URL = 'https://default-api.' + domain;
    }
}

// Create the Axios instance with the dynamic base URL
const axiosServices = axios.create({
    baseURL: BASE_URL, // Set the base URL dynamically
    timeout: 10000, // Optional: Set a timeout for requests
});

// Interceptor for HTTP responses
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if the response status is 401
        if (error.response && error.response.status === 401) {
            // Redirect to the login page
            window.location.reload();
        }

        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default axiosServices;
