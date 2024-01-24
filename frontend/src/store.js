import { configureStore } from "@reduxjs/toolkit";
import { slice } from './slices/apiSlice'
import cartSliceReducer from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        [slice.reducerPath]: slice.reducer,
        cart: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(slice.middleware),
    devTools: true,
});

export default store;