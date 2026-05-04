import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FcDownLeft } from "react-icons/fc";

function CadastroLar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usuario_id: "",
    capacidade: "",
    especies_aceitas: "",
    observacoes: "",
    disponivel: true,
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/lares-temporarios", form);
      setMensagem("✅ Lar cadastrado com sucesso!");
      setForm({
        usuario_id: "",
        capacidade: "",
        especies_aceitas: "",
        observacoes: "",
        disponivel: true,
      });
    } catch (error) {
      console.log("Erro:", error);
      setMensagem("❌ Erro ao cadastrar lar. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-700 mb-4 transition"
        >
          <FcDownLeft size={24} /> Voltar
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          🏠 Oferecer Lar Temporário
        </h2>

        {mensagem && (
          <p className="text-center mb-4 font-semibold text-blue-600">
            {mensagem}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              ID do Usuário
            </label>
            <input
              type="number"
              name="usuario_id"
              value={form.usuario_id}
              onChange={handleChange}
              required
              placeholder="Digite seu ID de usuário"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Capacidade de Pets
            </label>
            <input
              type="number"
              name="capacidade"
              value={form.capacidade}
              onChange={handleChange}
              required
              min="1"
              placeholder="Quantos pets você pode receber?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Espécies Aceitas
            </label>
            <select
              name="especies_aceitas"
              value={form.especies_aceitas}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione...</option>
              <option value="Cachorro">🐶 Somente Cachorro</option>
              <option value="Gato">🐱 Somente Gato</option>
              <option value="Cachorro e Gato">🐶🐱 Cachorro e Gato</option>
              <option value="Todos">🐾 Todos os animais</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Observações
            </label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Ex: Tenho quintal, moro perto de parque..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="disponivel"
              id="disponivel"
              checked={form.disponivel}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-600"
            />
            <label htmlFor="disponivel" className="text-gray-700 font-semibold">
              Estou disponível para receber pets agora
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-2"
          >
            Cadastrar Lar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroLar;
