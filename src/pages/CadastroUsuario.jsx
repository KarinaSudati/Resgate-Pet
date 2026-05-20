import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { IoArrowBack } from "react-icons/io5";

function CadastroUsuario() {
  const [form, setForm] = useState({ nome: "", watsapp: "", email: "" });
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", form);
      setMensagem("✅ Usuário cadastrado com sucesso!");
      setForm({ nome: "", watsapp: "", email: "" });
    } catch (error) {
      console.log("Erro completo", error);
      setMensagem("❌ Erro ao cadastrar usuário!");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        {/* Botão de voltar */}
        <button
          onClick={() => navigate(-1)}
          className=" cursor-pointer text-blue-600 hover:text-blue-800 font-semibold mb-4"
        >
          <IoArrowBack size={24} />
          Voltar
        </button>

        <h2 className=" cursor-pointer text-2xl font-bold text-blue-700 mb-6 text-center">
          👤 Cadastro de Usuário
        </h2>

        {mensagem && (
          <p className="text-center mb-4 font-semibold text-blue-600">
            {mensagem}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Seu nome completo"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              WhatsApp
            </label>
            <input
              type="text"
              name="watsapp"
              value={form.watsapp}
              onChange={handleChange}
              required
              placeholder="(11) 99999-9999"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className=" cursor-pointer bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-2"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroUsuario;
