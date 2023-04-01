import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import History from "./components/History";
import Navbar from "./components/Navbar";
import AddVideo from "./components/AddVideo";

export default function App(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/History" element={<History />} />
        <Route path="/addVideo" element={<AddVideo />} />
      </Routes>
    </BrowserRouter>
  );
}
