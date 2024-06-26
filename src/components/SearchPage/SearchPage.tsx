import { Link } from 'react-router-dom';
import Navbar from '../Navbar'
import Search from '../Search';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNewsDetails } from '../../Features/NewsSlice';

const main = () => {
  const dispatch = useAppDispatch();
  const { searchData } = useAppSelector((state) => state.news);

  return (
    <>
      <Navbar />
      <Search/>
       {
        searchData.length > 0 ? <div className="mt-2 max-w-[1600px] grid grid-cols-1 mx-auto gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          searchData.map((data, index) => {
            return (
              <div className="shadow-newsShadow pb-2 rounded-md overflow-hidden " key={index}>
              <div className="w-full h-52">
              <img src={`${data.urlToImage || "./bbc_news_logo.png"}`} alt="image not available" onError={(e) => e.currentTarget.src = "/bbc_news_logo.png"} className="w-full h-full"/>
              </div>
              <div className="px-4 mt-2 text-left">
                <h3 className="font-bold md:text-lg leading-6">{data.title}</h3>
                <p>{data.content} 
                  <Link to = "/NewsDetails" className="text-blue-700 underline" onClick={() => dispatch(getNewsDetails(data))}>[read more]</Link>
                </p>
              </div>
            </div>
            )
          })
        }
      </div> :
      <div className='text-center mt-10 font-semibold font-sans text-xl'>
        No Result found
      </div>
       }
    </>
  )
}

export default main;