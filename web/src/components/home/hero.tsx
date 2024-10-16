import okpara from "../../assets/okpara.png";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import stackoverflow from "../../assets/stackoverflow.svg";
import whatsapp from "../../assets/whatsapp-button.svg";
import phone from "../../assets/phone.svg";
import gmail from "../../assets/gmail.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  const width = 22;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[1200px] mx-auto py-8 md:h-[70vh] rounded-md p-4">
      <div className="col-span-2 px-1 my-auto">
        <div className="text-color">Hi, my name is</div>
        <h1 className="text-fancy-color text-3xl sm:text-3xl lg:text-4xl font-extrabold">
          <div className="text-color">Okpara Ifeanyi Ambrose</div>
        </h1>
        <div className="sm:text-lg my-2 lg:text-xl text-justify">
          <p>
            I'm a seasoned &lt;Full-Stack-Developer/&gt; & Data Analyst. I craft
            web applications with precision and analyze data with flair,
            uncovering insights that drive enterprise growth.
          </p>
        </div>
        <ul className="flex justify-start items-center gap-7">
          <li>
            <Link
              to="https://github.com/okparaa"
              target="_blank"
              className="skills-link"
            >
              <img src={github} alt="" width={width} className="hover:border" />
            </Link>
          </li>
          <li>
            <Link
              to="https://linkedin.com/in/okpara-ambrose-635577220"
              target="_blank"
              className="skills-link"
            >
              <img
                src={linkedin}
                alt=""
                width={width}
                className="hover:border"
              />
            </Link>
          </li>
          <li>
            <Link
              to="https://stackoverflow.com/users/22500396/okpara-ambrose"
              target="_blank"
              className="skills-link"
            >
              <img
                src={stackoverflow}
                alt=""
                width={width}
                className="hover:border"
              />
            </Link>
          </li>
          <li>
            <Link
              to="tel:2348133709989"
              target="_blank"
              className="skills-link"
            >
              <img src={phone} alt="" width={width} className="hover:border" />
            </Link>
          </li>
          <li>
            <Link to="#" className="skills-link">
              <img src={gmail} alt="" width={width} className="hover:border" />
            </Link>
          </li>
        </ul>
        <div className="my-5 flex justify-start items-center gap-2">
          <div>
            <Link
              to="/"
              className="hover:bg-slate-700 rounded-md bg-slate-800 outline-green-500 p-[12px] text-white text-lg"
            >
              Download CV
            </Link>
          </div>
          <div>
            <Link
              to="https://wa.me/2348133709989?text=I'm%20available%20for%20work%20and%20business"
              target="_blank"
              className="rounded-md text-white text-xl block"
            >
              <img
                src={whatsapp}
                className="w-[190px] md:w-[220px] hover:text-black"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-1 mx-auto my-auto h-auto">
        <div className="rounded-lg border-white outline-red-300">
          <img src={okpara} alt="hero image" className="resize" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
