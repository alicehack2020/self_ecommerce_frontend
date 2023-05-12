import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const setToken = (token) => {
   Cookies.set('token', token);
}


export const successMessage=(message) => {
   toast.success(message);
}

export const errorsMessage=(message) => {
   toast.error(message);
}

