import Request from "./";
import { backend_url } from "../constants/Constants";
// let token = sessionStorage.getItem("token");

const ACCEPT_TYPE = "application/json";

//get
export const getRequest = ({ url = "" }) => {
  return Request(backend_url)(url, {
      method: "GET",
    //   headers: {
    //     'X-RapidAPI-Key': '03bea62addmsha3ab54f7a24f5b8p159df2jsnb653f89ea9fc',
    //     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    //   }
  });
};

//post
export const postRequest = ({ url = "" }) => {
  return Request(backend_url)(url, {
      method: "POST",
    //   headers: {
    //     'X-RapidAPI-Key': '03bea62addmsha3ab54f7a24f5b8p159df2jsnb653f89ea9fc',
    //     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    //   }
  });
};
//delete
export const deleteRequest = ({ url = "" }) => {
  return Request(backend_url)(url, {
      method: "DELETE",
    //   headers: {
    //     'X-RapidAPI-Key': '03bea62addmsha3ab54f7a24f5b8p159df2jsnb653f89ea9fc',
    //     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    //   }
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
  let token = sessionStorage.getItem("token");
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