import { createSlice } from "@reduxjs/toolkit";

const initialState =[];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        emptyCart(state, action) {
            return [];
        },
        addCart(state, action) {
            state.push(...action.payload)
        },
        updateCart(state, action) {
            // state = action.payload;
            // console.log(state, action)

        },
        removeCart(state, action) {
            const index = state.findIndex((cart) => cart.postid === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        // deleteCustomer(state, action) {
        //     const deleteIndex = action.payload;
        //     return state.filter((val, index) => index !== deleteIndex )
        // }
    }

})

export const { addCart, emptyCart, updateCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer