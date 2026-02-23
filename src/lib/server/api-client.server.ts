import axios from 'axios';
import { API_URL } from '$env/static/private';

const apiClient = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000      // 10 วินาที
});

export default apiClient;