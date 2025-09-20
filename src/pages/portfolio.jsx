import React from "react";
import { Link } from "react-router-dom";
import Loginbar from "../components/loginbar";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loginbar />
    </div>
  );
}
