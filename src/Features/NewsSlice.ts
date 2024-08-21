import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


interface NewsState {
    menu:string,
    loading: boolean,
    newsData:any[],
    searchData:any[],
    error:string | null,
    valueOfMenu: string,
}

const initialState:NewsState = {
    menu:"All",
    loading:true,
    newsData:[],
    searchData:[],
    error: "",
    valueOfMenu:"",
}

export const fetchNewsData = createAsyncThunk("user/fetchNewsData",async (menu:string) => {
    try {
        const res = await fetch('/data.json');
        const data = await res.json();
    
        if (menu.toLowerCase() !== 'all') {
          return data.articles.filter((ele:any) =>
            ele.content.toLowerCase().includes(menu.toLowerCase())
          );
        }
    
        return data.articles;
      } catch (err:any) {
        throw new Error("Network error. Please try again");
      }
})

const newsSlice = createSlice({
    name:"news",
    initialState,
    reducers: {
        setMenu: (state,action) => {
            state.menu = action.payload;
            state.searchData = [];
        },
        getSearchNews: (state,action) => {
            state.searchData = state.newsData.filter((ele) => ele.content.toLowerCase().includes(action.payload));
            console.log(state.searchData);
        },
        getNewsDetails: (state,action) => {
            window.localStorage.setItem("news",JSON.stringify(action.payload));
            state.loading = false;
        },
        setLoadingTrue: (state) => {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewsData.pending,(state)=> {
            state.loading = true;
        })
        builder.addCase(fetchNewsData.fulfilled,(state, action) => {
            state.newsData = action.payload;
            state.loading = false;
        });

        builder.addCase(fetchNewsData.rejected,(state,action) => {
            state.loading = false;
            toast.error(action.error.message);
        });
    }
});

export const {setMenu,getSearchNews,getNewsDetails,setLoadingTrue} = newsSlice.actions;

export default newsSlice.reducer;