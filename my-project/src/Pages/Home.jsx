import { useState } from "react";
import Heroes from "../components/Heroes";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Profil from "../components/Profil";
import Static from "../components/Static";
import Contact from "../components/Contact";
import Download from "../components/Download";



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
