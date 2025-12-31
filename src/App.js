// import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./authPages/Login";
import Signup from "./authPages/SignUp";
import LandingScreen from "./landing/landingScreen";
import About from "./landing/about";
import Contact from "./landing/contact";
import Features from "./landing/features";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}