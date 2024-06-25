import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


interface NewsState {
    menu:string,
    loading: boolean,
    newsData:any[],
    searchData:any[],
    error:string | null,
    singleNews: any | null,
}

const initialState:NewsState = {
    menu:"All",
    loading:true,
    newsData:[],
    searchData:[],
    error: "",
    singleNews:null,
}

export const fetchNewsData = createAsyncThunk("user/fetchNewsData",async (menu:string) => {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${menu}&pageSize=100&apiKey=ac50e199313b4bae939061557acb6379`);
    if(!res.ok) {
        throw new Error("Network Response was not ok");
    }
    const data = await res.json();
    console.log(data.articles);
    return data.articles;
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
            state.singleNews = action.payload;
            window.localStorage.setItem("news",JSON.stringify(state.singleNews));
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
            state.error = action.error.message || "Something went wrong";
        });
    }
});

export const {setMenu,getSearchNews,getNewsDetails} = newsSlice.actions;

export default newsSlice.reducer;