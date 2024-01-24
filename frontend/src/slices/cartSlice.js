import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};
const addDeciaml = (num) => {
    return (Math.round(num*100)/100).toFixed(2);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            //Calculate Item Price
            state.itemsPrice = addDeciaml(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            
            //Calculate Shipping Price
            state.shippingPrice = addDeciaml(state.itemsPrice > 100 ? 0 : 10);

            //Calculate Tax Price
            state.taxPrice = addDeciaml(Number((state.itemsPrice*0.18.toFixed(2))));

            // Calculate Total Price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

