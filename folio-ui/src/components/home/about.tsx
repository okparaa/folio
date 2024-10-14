import aboutme from "../../assets/aboutimg.jpeg";
const About = () => {
  return (
    <div className="text-slate-900 max-w-[1200px] mx-auto my-2">
      <div className="md:grid md:grid-cols-3 pt-4 md:py-6">
        <div className="mt-4 md:mt-0 text-left flex md:py-0 col-span-2">
          <div className="my-auto mx-6 text-justify">
            <h2 className="text-4xl font-bold mb-4 primary-color">About me</h2>
            <p className="text-base lg:text-lg">
              I'm a highly skilled and versatile professional with expertise in
              Full Stack Web Development and Data Analytics. As a Full Stack Web
              Developer, I've got the skills to tackle both front-end and
              back-end development, ensuring timely task delivery.
            </p>
            <p>
              As a Data Analyst, I can use tools like Excel, Python Pandas, SQL,
              and data visualization libraries like Tableau and Power BI. My
              blend of technical skills and analytical expertise enables me to
              approach problems from multiple angles. I'm passionate about
              staying up-to-date with industry trends and continuously expanding
              my skill set. At my leasure, play chess game and connect with
              family and friends.
            </p>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-xs md:text-4xl font-bold mb-0 md:mb-4 primary-color">
            &nbsp;
          </h2>
          <img
            src={aboutme}
            alt="about me"
            className="mx-auto rounded-3xl md:py-0"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
