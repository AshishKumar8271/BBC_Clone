import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMenu } from "../Features/NewsSlice";


interface DropDownProps {
    divHeight:React.RefObject<HTMLDivElement>,
    NavHeight:React.RefObject<HTMLDivElement>,
    slideNav:() => void,
}



const DropDown = ({divHeight,NavHeight,slideNav}:DropDownProps) => {
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
        <div className='h-0 overflow-hidden transition-all duration-300' ref={divHeight}>
            <div className="flex justify-between gap-10 py-2 mx-auto max-w-[1240px] shadow-menuShadow " ref={NavHeight}>
                <ul className="flex gap-5 flex-wrap">
                    <li className="sm:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-white transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Home</button>
                    </li>
                    <li className="sm:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-red-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>News</button>
                    </li>
                    <li className="sm:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-yellow-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Sport</button>
                    </li>
                    <li className="min-[650px]:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-green-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Earth</button>
                    </li>
                    <li className="min-[720px]:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-blue-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Reel</button>
                    </li>
                    <li className="min-[800px]:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-violet-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Worklife</button>
                    </li>
                    <li className="min-[900px]:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-green-800 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Travel</button>
                    </li>
                    <li className="lg:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-purple-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Culture</button>
                    </li>
                    <li className="xl:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-[#002856] transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Future</button>
                    </li>
                    <li className="xl:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-white transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>TV</button>
                    </li>
                    <li className="2xl:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-sky-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Weather</button>
                    </li>
                    <li className="2xl:hidden text-sm font-semibold py-2 hover:shadow-bottom hover:shadow-orange-600 transition-all duration-300">
                        <button onClick={(e) => handleButtonClick(e)}>Sounds</button>
                    </li>
                </ul>

                <div className="mr-2">
                    <button className="block py-1 text-2xl hover:shadow-bottom hover:shadow-white transition-all duration-300" onClick={()=>slideNav()}>
                        <FaXmark />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DropDown
