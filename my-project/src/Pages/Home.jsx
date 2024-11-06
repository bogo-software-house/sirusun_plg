import { useState } from "react";
import Heroes from "../Components/Heroes";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Profil from "../Components/Profil";
import Static from "../Components/Static";
import Contact from "../Components/Contact";
import Download from "../Components/Download";

import "../App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
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
