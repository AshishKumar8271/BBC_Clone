import { IoPerson, IoSearch } from "react-icons/io5";
import { BiDotsHorizontal } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import NavLinks from "./NavLinks.tsx";
import logo from "/logo.svg";
import DropDown from "./DropDown.tsx";
import { useAppSelector, useAppDispatch } from "../hooks.ts";
import {useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthError, signOut } from "firebase/auth";
import { auth } from "../firebase/setup.tsx";
import { hideRegsiterComponent } from "../Features/SignInSlice.ts";
import { toast } from "react-toastify";


const Navbar = () => {
  const {userName } = useAppSelector((state) => state.sign);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const divHeight = useRef<HTMLDivElement>(null);
  const NavHeight = useRef<HTMLDivElement>(null);

  // function for DropDown:
  const slideNav = () => {
    const DropDownContainer = divHeight.current as HTMLDivElement;
    const DropDown = NavHeight.current as HTMLDivElement;
    const heightOfDiv = DropDownContainer.getBoundingClientRect().height;

    const DropHeight = DropDown.getBoundingClientRect().height;

    if (heightOfDiv > 0) {
      DropDownContainer.style.height = "0px";
      DropDownContainer.style.overflow = "hidden";
    }

    else {
      DropDownContainer.style.height = `${DropHeight}px`;
      DropDownContainer.style.overflow = "visible";
    }
  }

  //signOut function:
  const handleSignOut = async() => {
    try {
      await signOut(auth);
      dispatch(hideRegsiterComponent())
      toast.success("Successfully logged out");
      navigate("/");
    }catch(err) {
      const error = err as AuthError;
      toast.error(error.message.substring(10).toString());
    }
  }

  return (
    <nav className="bg-black py-2 text-white px-4">
      <div className="mx-auto flex py-2 items-center justify-between max-w-[1240px]">

        {/* user for mobile */}
        <Link to={`${userName == "Sign In" ? "/user" : ""}`} className="group">
          <div className={`relative flex text-sm mr-4 gap-2 items-center px-2 md:min-w-40 md:px-0 -order-1 ${userName == "Sign In" && "hover:shadow-bottom hover:shadow-blue-600"} transition-all duration-300 z-30`}>
            <span
              className="block py-1 text-3xl "
            >
              <IoPerson />
            </span>
            <span className="hidden font-semibold md:block">{userName}</span>


            {
              userName != "Sign In" && 
              <>
                <div className="opacity-0 min-w-[100px] absolute w-full left-0 -bottom-12 md:-bottom-9 text-center z-50 rounded-md bg-black text-white group-hover:opacity-100 active:opacity-100 transition-all duration-300 shadow-md text-xs border border-stone-600 md:text-md">
                  <p className="md:hidden">{userName}</p>
                  <button className="flex gap-2 items-center justify-center w-full py-1 border border-stone-600 rounded-md" onClick={handleSignOut}>
                    <MdLogout className=" md:text-lg" />
                    Sign Out</button>
                </div>
                <div className=" opacity-0 group-hover:opacity-100 absolute w-3 h-3 z-40 left-1/2 -translate-x-1/2 -bottom-[13px] bg-stone-600 rotate-45 transition-all duration-300"></div>
              </>
            }

          </div></Link>

        {/* logo of BBC */}
        <div className="my-auto mr-4 sm:-order-2">
          <Link to="/" className="">
            <img className="h-[30px] sm:h-[60px]" src={logo} alt="" />
          </Link>
        </div>

        {/* Navlinks for bigger screen */}
        <div className="hidden w-full sm:block my-auto">
          <NavLinks />
        </div>

        {/* menu and search button */}
        <div className="flex gap-2 justify-end items-center">
          <div>
            <button className="sm:hidden py-1 px-2 text-3xl hover:shadow-bottom hover:shadow-white transition-all duration-300" onClick={() => slideNav()}>
              <GiHamburgerMenu />
            </button>
            <button className="hidden sm:block py-1 px-2 text-3xl hover:shadow-bottom hover:shadow-white transition-all duration-300" onClick={() => slideNav()}>
              <BiDotsHorizontal />
            </button>
          </div>

          
          {/* search for tablets */}
          <Link to="/search">
            <button className="py-1 px-2 text-3xl hover:shadow-bottom hover:shadow-white transition-all duration-300 lg:hidden">
              <IoSearch />
            </button>

            {/* search bar for monitors */}
            <div className="hidden lg:flex min-w-52 bg-[#202224] pl-3 py-2 items-center gap-2 font-semibold">
              <button>
                <IoSearch />
              </button>
              <p className="text-sm">Search BBC</p>
            </div>
          </Link>
        </div>
      </div>
      {/* DropDown */}
      <DropDown divHeight={divHeight} NavHeight={NavHeight} slideNav={slideNav} />
    </nav>
  );
};

export default Navbar;
