export const LIMIT = 6;

export const ACTIONS = {
  products: "products",
  oneProduct: "oneProduct",
  pageTotalCount: "pageTotalCount",
  user: "user",
  cart: "cart",
  cartLength: "cartLength",
};

export const API = "http://localhost:8000/products";

export const ADMINS = ["admin@admin.com"];

export function totalSumFunc(products) {
  let data = products.reduce((acc, item) => acc + item.subPrice, 0);
  return data;
}
