export const addDeciaml = (num) => {
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart = (state) => {
    //Calculate Item Price
    state.itemsPrice = addDeciaml(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            
    //Calculate Shipping Price
    state.shippingPrice = addDeciaml(state.itemsPrice > 100 ? 0 : 10);

    //Calculate Tax Price
    state.taxPrice = addDeciaml(Number((state.itemsPrice*0.18.toFixed(2))));

    // Calculate Total Price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}