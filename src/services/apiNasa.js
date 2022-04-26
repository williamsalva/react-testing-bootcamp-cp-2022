import axios from 'axios';
import { APP_SERVICE_BASE_URL, API_KEY_NASA } from '../config';

const baseUrl = APP_SERVICE_BASE_URL;
const apiKey = API_KEY_NASA;

export const getData = ({ date }) =>
	axios.get(`${baseUrl}/apod?api_key=${apiKey}&date=${date}`);
