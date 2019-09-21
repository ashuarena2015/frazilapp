import { create } from 'axios';

export const config = {
	baseURL: 'http://ideaweaver.in/frazil-php',
	//baseURL: 'http://localhost/frazil-php'
};
const axiosInstance = create(config);

export default axiosInstance;
