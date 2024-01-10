import { configureStore } from "@reduxjs/toolkit";
import { slice } from './slices/apiSlice'

const store = configureStore({
    reducer: {
        [slice.reducerPath]: slice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(slice.middleware),
    devTools: true,
});

export default store;