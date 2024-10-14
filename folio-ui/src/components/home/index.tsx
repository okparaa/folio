import Navbar from "../utils/navbar";
import About from "./about";
import Hero from "./hero";
import Skills from "./skills";
import Projects from "./projects";

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Projects />
    </>
  );
};

export default Index;
