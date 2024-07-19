import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        data: JSON.parse(localStorage.getItem("wishlist")) || [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            state.data.push(action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.data));
        },
        removeFromWishlist: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer