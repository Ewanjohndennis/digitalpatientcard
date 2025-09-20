// src/components/NavButton.jsx
import { Link } from "react-router-dom";
function NavButton({ text, href="#" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center px-6 py-3 border-2 border-emerald-500 text-emerald-900 bg-white rounded-md hover:bg-emerald-500 hover:text-white transition-colors duration-200 cursor-pointer"
    >
      {text}
    </a>
  );
}

export default NavButton;