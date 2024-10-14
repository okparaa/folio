import { useState } from "preact/hooks";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  return (
    <div className="h-[65px] text-slate-950 max-w-[1200px] mx-auto flex justify-between items-center">
      <h1 className="text-4xl text-fancy-color font-bold ml-5">&lt;Ok&gt;</h1>
      <ul className="text-color text-lg hidden md:flex md:gap-6">
        <li className="border md:rounded-md pb-[1px] hover:bg-green-800 hover:text-gray-300 px-4 border-green-600">
          <Link to="#">About</Link>
        </li>
        <li className="border md:rounded-md pb-[1px] hover:bg-green-800 hover:text-gray-300 px-4 border-green-600">
          <Link to="#">Work</Link>
        </li>
        <li className="border md:rounded-md pb-[1px] hover:bg-green-800 hover:text-gray-300 px-4 border-green-600">
          <Link to="#">Contact</Link>
        </li>
      </ul>
      <div
        onClick={() => setNav(!nav)}
        className="block md:hidden mr-6 text-xl cursor-pointer"
      >
        {nav ? (
          <span className="icon-cancel"></span>
        ) : (
          <span className="icon-menu"></span>
        )}
      </div>
      <div
        className={
          nav
            ? `fixed z-10 text-black h-full left-0 top-0 w-[40%] bg-gradient-to-br from-blue-500 to-blue-300 ease-in-out duration-500 pl-6 pt-1`
            : `fixed left-[-100%]`
        }
      >
        <h1 className="text-3xl m-2 pl-4 font-bold">OAI</h1>
        <ul className="p-4 text-xl text-right">
          <li className="p-2 mx-2">
            <Link
              to="#"
              className="w-full border-b-[1px] inline-block px-2 border-black"
            >
              About
            </Link>
          </li>
          <li className="p-2 mx-2">
            <Link
              to="#"
              className="w-full border-b-[1px] inline-block px-2 border-black"
            >
              Work
            </Link>
          </li>
          <li className="p-2 mx-2">
            <Link
              to="#"
              className="w-full border-b-[1px] inline-block px-2 border-black"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
