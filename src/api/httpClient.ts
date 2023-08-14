import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';
import Error from '@/models/errorResponse';

const httpClient = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

httpClient.defaults.withCredentials = true;
// const getAuthToken = () => localStorage.getItem('token');

// const authInterceptor = (config: any) => {
//   config.headers['Authorization'] = getAuthToken();
//   return config;
// };

// httpClient.interceptors.request.use(authInterceptor);

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
      // notify({
      //   type: 'success',
      //   title: response.status.toString(),
      //   text: 'Success',
      // });
      break;
    case 201:
      console.log(response.data);
      notify({
        type: 'success',
        title: response.status.toString(),
        text: 'Created',
      });
      break;
    default:
      console.log(response.data);
      break;
  }
  return response;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
