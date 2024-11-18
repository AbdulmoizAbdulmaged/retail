import axios from "axios";
const BASE_URL = "https://retail-api.onrender.com/api/";
let TOKEN = ""
if(localStorage.getItem('persist:root') !== null){
  if(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).customer).currentCustomer !== null){
    TOKEN   = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).customer).currentCustomer.accessToken;
  }


}
export const publicRequest = axios.create(
  {
    baseURL:BASE_URL,
  }
);

export const userRequest = axios.create(
  {
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`},
  }
)

