import { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "../hooks";
import { fetchNewsData, getNewsDetails } from "../Features/NewsSlice";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/setup";


const Home = () => {
  const {newsData,loading,error,menu} = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNewsData(menu));
  },[dispatch,menu]);

  const addNewsToStore = async(data:any) => {
    const newsDocRef = doc(db, 'news',data.publishedAt);
    try {
      await setDoc(newsDocRef,{
        title: data.title,
        des: data.description,
      })
    }catch(err) {
      console.log(err);
    }
  }

  if(loading) {
    return (
      <div className="h-screen grid place-items-center">
        Loading...
      </div>
    )
  }

  if(error) {
    <div className="mt-2 text-center">
      <p>{error}</p>
    </div>
  }
  return (
    <div className="mt-2 max-w-[1600px] grid grid-cols-1 mx-auto gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        newsData.map((data,index) => {
          return (
            <div className="shadow-newsShadow pb-2 rounded-md overflow-hidden " key={index}>
              <div className="w-full h-52">
              <img src={`${data.urlToImage || "./bbc_news_logo.png"}`} alt="image not available" onError={(e) => e.currentTarget.src = "./bbc_news_logo.png"} className="w-full h-full"/>
              </div>
              <div className="px-4 mt-2 text-left">
                <h3 className="font-bold md:text-lg leading-6">{data.title}</h3>
                <p>{data.content} 
                  <Link to = "./NewsDetails" className="text-blue-700 underline" onClick={() =>{
                    dispatch(getNewsDetails(data));
                    addNewsToStore(data);
                  } }>[read more]</Link>
                </p>
              </div>
            </div>
          )
        })
      }
    </div>

  )
}

export default Home;