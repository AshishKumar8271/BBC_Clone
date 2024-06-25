import SignIn from "./components/SignIn.tsx";
import Main from "./components/Main/Main.tsx";
import SearchPage from "./components/SearchPage/SearchPage.tsx";
import {Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/setup.tsx";
import { setUserName } from "./Features/SignInSlice.ts";
import { useAppDispatch } from "./hooks.ts";
import logo from "/logo.svg";
import { ToastContainer } from "react-toastify";
import NewsDetails from "./components/NewsDetails.tsx";


const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();


  useEffect(() =>{
    onAuthStateChanged(auth,(user) => {
        if(user) {
            dispatch(setUserName(user.displayName as string));
        }
        else {
            dispatch(setUserName("Sign In"));
        }
        setLoading(false);
    })
},[])

  if(loading) {
    return (
      <div className="h-screen w-screen bg-black grid place-items-center">
        <img src={logo} alt="" className="h-40 w-40 animate-scale"/>
      </div>
    )
  }

  else {
    return (
      <>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/user" element={<SignIn/>}/>
        <Route path="/newsDetails" element={<NewsDetails/>}/>
        <Route path="/search" element = {<SearchPage/>}/>
      </Routes>
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
      </>
    )
  }
}

export default App
