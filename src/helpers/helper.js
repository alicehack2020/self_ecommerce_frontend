import { toast } from 'react-toastify';


export const setToken = (token, id) => {
   localStorage.setItem("token",token) 
   localStorage.setItem("id",id) 
}


export const successMessage=(message) => {
   toast.success(message);
}

export const errorsMessage=(message) => {
   toast.error(message);
}

