import { useState } from "react";

import Heroes from "../Heroes";
import Footer from "../Footer";
import Card from "../Card";
import Profil from "../Profil";
import Static from "../Static";
import Contact from "../Contact";

import "../App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Heroes />
      <Card />
      <Profil />
      <Static />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
