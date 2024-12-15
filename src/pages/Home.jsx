import React from "react";
import Heroes from "../components/landingpage/Heroes";
import Footer from "../components/landingpage/Footer";
import Card from "../components/landingpage/Card";
import Profil from "../components/landingpage/Profil";
import Static from "../components/landingpage/Static";
import Contact from "../components/landingpage/Contact";
import Download from "../components/landingpage/Download";
import AlurPendaftaran from "../components/landingpage/AlurPendaftaran";

import "../App.css";

function Home() {
  return (
    <>
      <Heroes />
      <Card />
      <Profil />
      <Download />
      <AlurPendaftaran />
      <Static />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
