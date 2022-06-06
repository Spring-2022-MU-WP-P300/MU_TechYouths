import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => {
  return response.data;
};

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
};

const Cart = {
  get: () => requests.get("cart"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
  deleteItem: (productId: number, quantity = 1) =>
    requests.delete(`cart?productId=${productId}&quantity=${quantity}`),
};

export const Account = {
  currentUser: () => requests.get("account/currentUser"),
  login: (values: any) => requests.get("account/login", values),
  register: (values: any) => requests.get("account/register", values),
};

const Products = {
  list: (params: URLSearchParams) => requests.get("products", params),
  fetchFilters: () => requests.get(`products/filters`),
  details: (id: number) => requests.get(`products/${id}`),
  cart: Cart,
};

export default Products;
