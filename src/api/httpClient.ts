import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';
import Error from '@/models/errorResponse';

const httpClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
httpClient.defaults.withCredentials = true;

const errorInterceptor = (errorResponse: any): Promise<never> => {
  const error: Error = errorResponse.response.data;
  switch (error.status) {
    case 401:
      notify({
        type: 'error',
        title: error.status.toString(),
        text: error.message,
      });
      break;
    case 403:
      notify({
        type: 'error',
        title: error.status.toString(),
        text: error.message,
      });
      break;
    case 404:
      notify({
        type: 'error',
        title: error.status.toString(),
        text: error.message,
      });
      break;
    case 409:
      notify({
        type: 'error',
        title: error.status.toString(),
        text: error.message,
      });
      break;
    case 500:
      notify({
        type: 'error',
        title: error.status.toString(),
        text: error.message,
      });
      break;
    default:
      notify({
        type: 'error',
        text: 'unknown error',
      });
      console.log(errorResponse);
      break;
  }
  return Promise.reject(errorResponse);
};

const responseInterceptor = (response: any) => {
  switch (response.status) {
    case 200:
      console.log(response.data);
      break;
    case 201:
      console.log(response.data);
      break;
    case 204:
      console.log(response.data);
      break;
    default:
      console.log(response.data);
      break;
  }
  return response;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
