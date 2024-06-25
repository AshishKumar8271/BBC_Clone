import {useState } from 'react';
import { useAppDispatch } from '../hooks';
import { hideRegsiterComponent, setUserName } from '../Features/SignInSlice';
import { auth } from "../firebase/setup.tsx";
import { createUserWithEmailAndPassword, updateProfile,AuthError } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [valueForEmail, setValueForEmail] = useState<boolean>(false);
  const [valueForName,setValueForName] = useState(false);
  const [valueForPassword, setValueForPassword] = useState<boolean>(false);
  const nav = useNavigate();


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      })
      dispatch(setUserName(name));
      toast.success("Registered Successfully");
      nav("/");

    } catch (err) {
      const error = err as AuthError;
      console.log(error.message);
      toast.error(error.message.substring(10).toString());
    }
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mt-4">
        Register with the BBC
      </h1>

      <form className="p-2 mt-14" onSubmit={(e) => handleRegister(e)}>

          {/* User Name */}
          <div className="relative input">
            <input
              type="text"
              name="u_Name"
              id="u_Name"
              value={name}
              required
              className="peer w-full text-white bg-transparent outline-none"
              onChange={(e) => {
                setValueForName(() => e.target.value ? true : false);

                setName(e.currentTarget.value);
              }}
            />

            <label
              htmlFor="u_Name"
              className={`absolute ${valueForName
                  ? "-top-8 text-base text-white"
                  : "-top-1 text-xl text-zinc-500"
                } font-semibold left-0 peer-focus:-top-8 peer-focus:text-base peer-focus:text-white  transition-all ease duration-300`}
            >
              Name
            </label>
          </div>

        <div className="w-full border-[1px]"></div>

          {/* Email address */}
        <div className="relative input mt-10">
          <input
            type="email"
            name="email_id"
            id="email_id"
            value={email}
            required
            className="peer w-full text-white bg-transparent outline-none"
            onChange={(e) => {
              setValueForEmail(() => e.target.value ? true : false);

              setEmail(e.currentTarget.value);
            }}
          />

          <label
            htmlFor="email_id"
            className={`absolute ${valueForEmail
                ? "-top-8 text-base text-white"
                : "-top-1 text-xl text-zinc-500"
              } font-semibold left-0 peer-focus:-top-8 peer-focus:text-base peer-focus:text-white  transition-all ease duration-300`}
          >
            Email or username
          </label>
        </div>

        <div className="w-full border-[1px]"></div>

        {/* Password */}
        <div className="relative input mt-10">
          <input
            type={`${showPassword ? "text" : "password"}`}
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

          <button type='button' className='absolute right-2 text-sm' onClick={() => setShowPassword(!showPassword)}>Show password</button>
        </div>

        <div className="w-full border-[1px]"></div>
        <button
          className="mt-6 bg-blue-600 w-full p-4 font-bold hover:scale-[1.02] hover:bg-blue-700 transition-all duration-100"
          type="submit"
        >
          Register
        </button>
      </form>

      <div className="mt-6">
        <hr />
        <h4 className="mt-2 font-bold">Already have a BBC account ? </h4>
        <button
          className="text-blue-500 underline hover:font-semibold transition-all"
          onClick={() => dispatch(hideRegsiterComponent())}
        >

          SignIn Now
        </button>
      </div>
    </div>
  )
}

export default RegisterPage;