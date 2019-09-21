import { create } from 'axios';

export const config = {
	baseURL: 'http://ideaweaver.in/frazil-php'
};
const axiosInstance = create(config);

export default axiosInstance;
