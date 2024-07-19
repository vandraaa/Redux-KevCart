import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

console.log("On create Store: ", store.getState());

store.subscribe(() => {
  console.log("On change Store: ", store.getState());
});

export default store;
