import { useState } from "react";
import logo from "/logo.svg";
import { ImCross } from "react-icons/im";
import bg from "/BBc_Bg.png";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/setup";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { showRegsiterComponent, setUserName } from "../Features/SignInSlice";
import RegisterPage from "./RegisterPage";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const UserSign = useAppSelector((state) => state.sign.userRegister);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [readPassword, setReadPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valueForPassword, setValueForPassword] = useState(false);
  const [value, setValue] = useState<boolean>(false);

  // const googleSignin = async () => {
  //   try {
  //     await signInWithPopup(auth, googleAuthProvider);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const isValue = (value: string) => {
    if (value) {
      setValue(true);
    } else {
      setValue(false);
    }
  };



  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUserName(userCredential.user.displayName as string);
      toast.success("Successfully logged in");
      navigate("/");
    } catch (err) {
      const error = err as AuthError;
      toast.error(error.message.substring(10).toString());
    }
  }


  return (
    <div
      className={`fixed w-full min-h-screen top-0 bg-black text-white grid grid-cols-1 transition-all duration-300 md:grid-cols-1 text-center pb-4 px-1`}
    >
      <div
        className="absolute pt-2 top-0 right-0 w-full h-full hidden md:block"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "calc(40% - 1rem) auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
      ></div>
      <Link to={"/"}>
        <button
          className="bg-white text-black absolute p-1.5 right-8 top-6 text-sm z-20"
        >
          <ImCross />
        </button>
      </Link>

      <div className="max-w-[900px] mt-6 sm:w-4/5 sm:my-auto sm:mx-auto md:w-2/5 md:mt-20 md:ml-20 z-10">
        <img src={logo} alt="" className="h-10 w-full" />


        {
          !UserSign ? <div>
            <h1 className="font-bold text-2xl mt-4">
              Enter your email or username
            </h1>

            <form className="p-2 mt-14" onSubmit={(e) => handleSignIn(e)}>
              <div className={`${readPassword && "hidden"}`}>
                <div className="relative input">
                  <input
                    type="email"
                    name="email_id"
                    id="email_id"
                    value={email}
                    required
                    className="peer w-full text-white bg-transparent outline-none"
                    onChange={(e) => {
                      isValue(e.target.value);
                      setEmail(e.currentTarget.value);
                    }}
                  />

                  <label
                    htmlFor="email_id"
                    className={`absolute ${value
                        ? "-top-8 text-base text-white"
                        : "-top-1 text-xl text-zinc-500"
                      } font-semibold left-0 peer-focus:-top-8 peer-focus:text-base peer-focus:text-white  transition-all ease duration-300`}
                  >
                    Email or username
                  </label>
                </div>
                <div className="w-full border-[1px]"></div>

                <button
                  className={`${readPassword && "hidden"} mt-6 bg-blue-600 w-full p-4 font-bold hover:scale-[1.02] hover:bg-blue-700 transition-all duration-100`}
                  onClick={() => {
                    setReadPassword(true);
                  }} type="button">
                  Continue
                </button>
              </div>

              <div className={`${!readPassword && "hidden"}`}>
                <div className="relative input">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    required
                    className="peer w-full text-white bg-transparent outline-none"
                    onChange={(e) => {
                      setValueForPassword(() => e.target.value ? true : false);
                      setPassword(e.currentTarget.value);
                    }}
                  />

                  <label
                    htmlFor="password"
                    className={`absolute ${valueForPassword
                        ? "-top-8 text-base text-white"
                        : "-top-1 text-xl text-zinc-500"
                      } font-semibold left-0 peer-focus:-top-8 peer-focus:text-base peer-focus:text-white  transition-all ease duration-300`}
                  >
                    Password
                  </label>
                </div>
                <div className="w-full border-[1px]"></div>

                <button
                  className={`${!readPassword && "hidden"} mt-6 bg-blue-600 w-full p-4 font-bold hover:scale-[1.02] hover:bg-blue-700 transition-all duration-100`}
                  type="submit">
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-6">
              <hr />
              <h4 className="mt-2 font-bold">Don't have a BBC account ? </h4>
              <button
                className="text-blue-500 underline hover:font-semibold transition-all"
                onClick={() => dispatch(showRegsiterComponent())}
              >
                Register Now
              </button>
            </div>
          </div>

            :
            <RegisterPage />
        }
      </div>
    </div>
  );
};

export default SignIn;