import Container from "./Container";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 py-6 mt-12 font-inter">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Manish Industries logo" className="h-12 w-12 md:h-14 md:w-14 object-contain rounded" />
          <div className="font-bold text-lg text-primary">Manish Industries</div>
        </div>
        <div className="text-sm text-center md:text-left">
          <div>Vihim Steel Compound, Nr. Sureliya Estate, Nr. Gita Park, Vastral Road, Amraiwadi, Ahmedabad-380026</div>
          <div className="mt-2">
            Contact: <a href="tel:09898146433" className="text-primary hover:underline">+91-9898146433</a> | 
            <a href="tel:09427156433" className="ml-2 text-primary hover:underline">+91-9427156433</a>
          </div>
          <div>
            Email: <a href="mailto:manishindustries2312@gmail.com" className="text-primary hover:underline">manishindustries2312@gmail.com</a>
          </div>
        </div>
        <div className="text-sm text-center md:text-right">
          <div className="font-bold mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li><NavLink to="/" className={({isActive}) => isActive ? "underline" : "hover:underline"}>Home</NavLink></li>
            <li><NavLink to="/services" className={({isActive}) => isActive ? "underline" : "hover:underline"}>Services</NavLink></li>
            <li><NavLink to="/gallery" className={({isActive}) => isActive ? "underline" : "hover:underline"}>Gallery</NavLink></li>
            <li><NavLink to="/about" className={({isActive}) => isActive ? "underline" : "hover:underline"}>About</NavLink></li>
            <li><NavLink to="/contact" className={({isActive}) => isActive ? "underline" : "hover:underline"}>Contact</NavLink></li>
          </ul>
        </div>
      </Container>
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Manish Industries. All rights reserved.
      </div>
    </footer>
  );
}