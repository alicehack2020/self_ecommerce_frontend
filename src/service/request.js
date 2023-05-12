import Request from "./";
import { backend_url } from "../constants/Constants";
import Cookies from 'js-cookie';
const ACCEPT_TYPE = "application/json";


//get without token
export const getRequestWithoutToken = ({ url = "" }) => {
  return Request(backend_url)(url, {
      method: "GET",
  });
};


//get
export const getRequest = ({ url = "" }) => {
  let token = Cookies.get('token');
  return Request(backend_url)(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//post
export const postRequest = ({ url = "" }) => {
  let token = Cookies.get('token');
  return Request(backend_url)(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//delete
export const deleteRequest = ({ url = "" }) => {
  let token = Cookies.get('token');
  return Request(backend_url)(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const getAuthenticatedRequest = ({ url = "" }) => {
  let token = sessionStorage.getItem("token");

  return Request(backend_url)(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const doRequest = ({
  url = "",
  body = {},
  method = "POST",
  headers = {},
}) => {
  // let token = sessionStorage.getItem("token");
  let token = localStorage.getItem("token");
  return Request(backend_url)(url, {
    method: method,
    data: body,
    headers: {
      Accept: ACCEPT_TYPE,
      "Content-Type": ACCEPT_TYPE,
      authorization: `Bearer ${token}`,
    },
  });
};