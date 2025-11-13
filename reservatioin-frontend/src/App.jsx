import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header/Header.jsx";
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Reservations from './pages/Reservations'
import Contact from './pages/Contact'

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App;

