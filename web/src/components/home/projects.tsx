import acefuels from "../../assets/ace-login.png";
import hotel from "../../assets/hotel-landing.png";
import hotellogin from "../../assets/hotel-login.png";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <div className="pb-2">
        <p className="text-4xl mb-3 font-bold bg-primary">Projects</p>
        <p className="text-black">Checkout some of my projects</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center h-[200px] bg-cover relative">
          <img src={acefuels} alt="first project" className="object-fill" />
          <div className="opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-white tracking-wider"></span>
            <div className="pt-8 text-center">
              <Link to="https://acefuels-futo.ng">
                <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                  Live
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center h-[200px] bg-cover relative">
          <img src={hotellogin} alt="first project" className="object-fill" />
          <div className="opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-white tracking-wider"></span>
            <div className="pt-8 text-center">
              <Link to="/">
                <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                  Live
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center h-[200px] bg-cover relative">
          <img src={hotel} alt="first project" className="object-fill" />
          <div className="opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-white tracking-wider"></span>
            <div className="pt-8 text-center">
              <Link to="/">
                <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                  Live
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
