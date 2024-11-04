import { useState } from "react";

import Navbar from "../Navbar";
import Heroes from "../Heroes";
import Footer from "../Footer";
import Card from "../Card";
import Profil from "../Profil";
import Static from "../Static";
import Contact from "../Contact";
import Download from "../Download";

import "../App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Heroes />
      <Card />
      <Profil />
      <Download />
      <Static />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
