import { useNavigate } from "react-router-dom";
import { setMenu } from "../Features/NewsSlice";
import { useAppDispatch } from "../hooks";

const NavLinks = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let valueOfMenu = e.currentTarget.innerHTML.toString();
    if(valueOfMenu == "Home") {
      valueOfMenu = "All";
    }
    
    navigate("/");
    dispatch(setMenu(valueOfMenu));
  }
  return (
    <div className="flex justify-evenly  font-semibold">
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm sm:block hover:shadow-bottom hover:shadow-white transition-all duration-300">Home</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm sm:block hover:shadow-bottom hover:shadow-red-600 transition-all duration-300">News</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm sm:block hover:shadow-bottom hover:shadow-yellow-600 transition-all duration-300">Sports</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm min-[650px]:block hover:shadow-bottom hover:shadow-green-600 transition-all duration-300">Earth</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm min-[715px]:block hover:shadow-bottom hover:shadow-blue-600 transition-all duration-300">Reel</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm min-[800px]:block hover:shadow-bottom hover:shadow-violet-600 transition-all duration-300">Worklife</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm min-[900px]:block hover:shadow-bottom hover:shadow-green-800 transition-all duration-300">Travel</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm lg:block hover:shadow-bottom hover:shadow-purple-600 transition-all duration-300">Culture</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm hover:shadow-bottom hover:shadow-[#002856] transition-all duration-300">Future</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm hover:shadow-bottom hover:shadow-white transition-all duration-300">Tv</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm hover:shadow-bottom hover:shadow-sky-600 transition-all duration-300">Weather</button>
      <button onClick={(e) => handleButtonClick(e)} className="hidden py-2 text-sm hover:shadow-bottom hover:shadow-orange-600 transition-all duration-300">Sounds</button>
    </div>
  )
}

export default NavLinks;
