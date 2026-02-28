import axios from 'axios';
import { VITE_API_URL } from '$env/static/private';
import { TOKEN } from '$env/static/private';

const apiClient = axios.create({
	baseURL: `${VITE_API_URL}/api`,
	headers: {
		Accept: 'application/json',

		// อันนี้พอใส่แล้วมันส่ง file ไม่ได้อ้ะ
		// 'Content-Type': 'application/json',

		Authorization: `Bearer ${TOKEN}`
	},
	timeout: 10000 // 10 วินาที
});

export default apiClient;
