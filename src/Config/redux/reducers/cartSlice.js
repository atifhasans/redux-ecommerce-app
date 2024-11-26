import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addItem: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);

      if (index === -1) {
        // Ensure the payload is immutable by cloning it
        state.cart.push({ ...action.payload, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
    },
    removeItem: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.cart.splice(index, 1); // Remove item from cart
      }
    },
    addQuantity: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.cart[index].quantity += 1;
      }
    },
    lessQuantity: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        if (state.cart[index].quantity === 1) {
          state.cart.splice(index, 1); // Remove item if quantity is zero
        } else {
          state.cart[index].quantity -= 1;
        }
      }
    },
  },
});

export const { addItem, removeItem, lessQuantity, addQuantity } = cartSlice.actions;
export default cartSlice.reducer;
