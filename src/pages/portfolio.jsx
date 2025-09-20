import React from "react";
import { Link } from "react-router-dom";
import Loginbar from "../components/loginbar";
import logo from "../assets/logo.jpg";
import BlurText from "@/components/textblur";
export default function Home() {
  const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
  return (
  <div className="bg-gradient-to-b from-cyan-500 via-white to-cyan-500 min-h-screen">
    <div className="min-h-screen flex items-center justify-center">
      <Loginbar
  logo={logo}
  logoAlt="Company Logo"
  items={[
    { label: 'Home', href: '/' },
    { label: 'Login', href: '/login' },
    { label: 'Get Started', href: '/register' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#ffffff"
  pillColor="#00BCD4"
  hoveredPillTextColor="#00BCD4"
  pillTextColor="#000000"
/>
<div>
<div className="flex flex-col items-center justify-center min-h-screen px-4">
  <BlurText
    text="Digital Patient Card"
    delay={150}
    animateBy="words"
    direction="top"
    onAnimationComplete={handleAnimationComplete}
    className="text-4xl md:text-6xl text-center text-cyan-800 font-semibold mb-8"
  />

        <p className="text-lg md:text-xl mb-8 text-gray-700"> Your health records, anytime, anywhere.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login" className="inline-flex items-center px-6 py-3 border-2 border-cyan-500 text-cyan-900 bg-white rounded-md hover:bg-cyan-500 hover:text-white transition-colors duration-200 cursor-pointer">
            Get Started
          </Link>
          <Link to="/about" className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
