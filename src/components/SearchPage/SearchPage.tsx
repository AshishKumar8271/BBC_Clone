import { Link } from 'react-router-dom';
import Navbar from '../Navbar'
import Search from '../Search';
import { useAppSelector } from '../../hooks';

const main = () => {
  const { searchData } = useAppSelector((state) => state.news);

  return (
    <>
      <Navbar />
      <Search/>
      <div className="mt-2 max-w-[1600px] grid grid-cols-1 mx-auto gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          searchData.map((data, index) => {
            return (
              <div className="shadow-newsShadow pb-2 rounded-md overflow-hidden " key={index}>
              <div className="w-full h-52">
              <img src={`${data.urlToImage || "./bbc_news_logo.png"}`} alt="image not available" className="w-full h-full"/>
              </div>
              <div className="px-4 mt-2 text-left">
                <h3 className="font-bold md:text-lg leading-6">{data.title}</h3>
                <p>{data.content} 
                  <Link to = "./NewsDetails" className="text-blue-700 underline">[read more]</Link>
                </p>
              </div>
            </div>
            )
          })
        }
      </div>
    </>
  )
}

export default main;