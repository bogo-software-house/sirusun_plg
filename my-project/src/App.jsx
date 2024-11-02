import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Heroes from './Heroes'
import Footer from './Footer'
import Card from './Card'
import Profil from './Profil'
import Static from './Static'
import Contact  from './Contact'

import Detail from './Detail'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Heroes />
      <Card />
      <Profil />
      <Static />
      <Contact  />
      <Footer />
     
      {/* <Detail /> */}
    
    </>
  )
}

export default App
