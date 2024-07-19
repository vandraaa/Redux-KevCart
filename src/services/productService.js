import axios from "axios";

export const getProducts = async () => {
  const response = await axios({
    url: "https://fakestoreapi.com/products",
    method: "GET",
  });
  return response.data;
};

export const getDetailProduct = async (id) => {
  const response = await axios({
    url: `https://fakestoreapi.com/products/${id}`,
    method: "GET",
  })
  return response.data
};
