import { configureStore } from "@reduxjs/toolkit";
import SignInSlice from "./Features/SignInSlice.ts";
import NewsSlice from "./Features/NewsSlice.ts";


const store = configureStore( {
    reducer: {
        sign: SignInSlice,
        news: NewsSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;