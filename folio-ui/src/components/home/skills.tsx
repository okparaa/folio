import javascript from "../../assets/typescript.svg";
import nodejs from "../../assets/nodejs.svg";
import react from "../../assets/reactjs.svg";
import mysql from "../../assets/mysql.svg";
import graphql from "../../assets/graphql.svg";
import powerbi from "../../assets/powerbi.svg";

const Skills = () => {
  const width = 40,
    height = 40;
  return (
    <div className="bg-slate-300 rounded-2xl px-3 p-2 text-slate-900 md:h-[90px] max-w-[1200px] mx-auto grid grid-cols-7 place-items-center md:flex md:justify-between md:items-center">
      <h1 className="text-xl md:text-2xl font-bold mx-2">
        <p>Tech</p>
        <p> Stack</p>
      </h1>

      <div className="skills">
        <img src={javascript} alt="" width={width} height={height} />
        <p>JS/TS</p>
      </div>

      <div className="skills">
        <img src={react} alt="" width={width} height={height} />
        <p>React</p>
      </div>

      <div className="skills">
        <img src={nodejs} alt="" width={width} height={height} />
        <p>Node</p>
      </div>

      <div className="skills">
        <img src={mysql} alt="" width={width} height={height} />
        <p>SQL/MySql</p>
      </div>

      <div className="skills">
        <img src={graphql} alt="" width={width} height={height} />
        <p>GraphQl</p>
      </div>

      <div className="skills">
        <img src={powerbi} alt="" width={width} height={height} />
        <p>PowerBI</p>
      </div>
    </div>
  );
};

export default Skills;
