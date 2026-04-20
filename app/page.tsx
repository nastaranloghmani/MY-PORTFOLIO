import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
