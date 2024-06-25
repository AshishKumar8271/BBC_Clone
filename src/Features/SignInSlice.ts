import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    userRegister: false,
    userName: "",    
};


const SignInSlice = createSlice( {
    name:'sign',
    initialState,
    reducers: {
        hideRegsiterComponent: (state) => {
            state.userRegister = false;
        },

        showRegsiterComponent: (state) => {
            state.userRegister = true;
        },

        setUserName: (state,action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
    }

});

export const {hideRegsiterComponent,showRegsiterComponent,setUserName} = SignInSlice.actions;
export default SignInSlice.reducer;