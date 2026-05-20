import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          🐾 Resgate Pet
        </Link>
        {/* Menu Hamburguer, só aparece no mobile! */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? "✕" : "☰"}
        </button>
        {/* Aparece normalmente no Desktop */}
        <div className="hidden md:flex gap-4">
          <Link to="/pets" className="hover:text-blue-200 transition">
            Pets
          </Link>
          <Link to="/cadastro-pet" className="hover:text-blue-200 transition">
            Cadastrar Pet
          </Link>
          <Link to="/cadastro-lar" className="hover:text-blue-200 transition">
            Oferecer Lar
          </Link>
          <Link
            to="/cadastro-usuario"
            className="hover:text-blue-200 transition"
          >
            Cadastro
          </Link>
        </div>
      </div>
      {/* Menu Mobile, só aparece quando clica no menu hamburguer */}
      {menuAberto && (
        <div className="md:hidden flex flex-col gap-3 mt-4 border-t border-blue-500 pt-4">
          <Link
            to="/pets"
            onClick={() => setMenuAberto(false)}
            className="hover:text-blue-200 transition"
          >
            Pets
          </Link>
          <Link
            to="/cadastro-pet"
            onClick={() => setMenuAberto(false)}
            className="hover:text-blue-200 transition"
          >
            Cadastrar Pet
          </Link>
          <Link
            to="/cadastro-lar"
            onClick={() => setMenuAberto(false)}
            className="hover:text-blue-200 transition"
          >
            Oferecer Lar
          </Link>
          <Link
            to="/cadastro-usuario"
            onClick={() => setMenuAberto(false)}
            className="hover:text-blue-200 transition"
          >
            Cadastro
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
