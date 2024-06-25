import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch } from "../hooks";
import { getSearchNews } from "../Features/NewsSlice";


const Search = () => {
  const dispatch = useAppDispatch();
  const [value,setValue] = useState("");

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getSearchNews(value.toLowerCase()));
  }


  return (
    <div className="mt-6 mx-3">
      <form className="max-w-[800px] flex items-center gap-4 bg-zinc-100 mx-auto shadow-sm md:text-lg" onSubmit={(e) =>handleSubmit(e)}>
      <div className="flex items-center w-full gap-4 px-4 py-3 focus-within:outline">
        <IoSearch className="text-xl md:text-2xl"/>
      <input type="text" placeholder="Search the BBC" value={value} className="bg-transparent w-full outline-none text-gray-600 placeholder:text-gray-600" onChange={(e) => setValue(e.target.value)}/>
      </div>
      <button type="submit" className="mr-4 font-semibold">Search</button>
      </form>
    </div>
  )
}

export default Search