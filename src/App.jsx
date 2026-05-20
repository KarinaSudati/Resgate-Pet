import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroPet from "./pages/CadastroPet";
import ListaPets from "./pages/ListaPets";
import CadastroLar from "./pages/CadastroLar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/cadastro-pet" element={<CadastroPet />} />
        <Route path="/pets" element={<ListaPets />} />
        <Route path="/cadastro-lar" element={<CadastroLar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
