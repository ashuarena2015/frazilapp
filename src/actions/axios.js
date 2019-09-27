import { create } from 'axios';

export const config = {
	baseURL: APP_URL,
};
const axiosInstance = create(config);

export default axiosInstance;
