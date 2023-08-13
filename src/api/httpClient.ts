import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';

const httpClient = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 1000,
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

const errorInterceptor = (error: any): Promise<never> => {
  switch (error.response.status) {
    case 401:
      console.log(error.response.data);
      notify({
        type: 'error',
        title: error.response.status.toString(),
        text: 'You are not authorized to access this resource',
      });
      break;
    case 403:
      console.log(error.response.data);
      notify({
        type: 'error',
        title: error.response.status.toString(),
        text: 'You are not authorized to access this resource',
      });
      break;
    case 404:
      console.log(error.response.data);
      notify({
        type: 'error',
        title: error.response.status.toString(),
        text: 'The resource you are looking for was not found',
      });
      break;
    case 409:
      console.log(error.response.data);
      notify({
        type: 'error',
        title: error.response.status.toString(),
        text: 'Credentials already in use',
      });
      break;
    case 500:
      console.log(error.response.data);

      notify({
        type: 'error',
        title: error.response.status.toString(),
        text: 'An error occurred on the server',
      });
      break;
    default:
      console.log(error.response.data);

      break;
  }
  return Promise.reject(error);
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
