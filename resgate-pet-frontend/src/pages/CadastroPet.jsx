import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { IoArrowBack } from "react-icons/io5";

function CadastroPet() {
  const [form, setForm] = useState({
    usuario_id: "",
    nome_pet: "",
    especie: "",
    status: "",
    localizacao: "",
    descricao: "",
    foto_url: "",
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pets", form);
      setMensagem("✅ Pet cadastrado com sucesso!");
      setForm({
        usuario_id: "",
        nome_pet: "",
        especie: "",
        status: "",
        localizacao: "",
        descricao: "",
        foto_url: "",
      });
    } catch (error) {
      console.log("Erro:", error);
      setMensagem("❌ Erro ao cadastrar pet. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-1 text-blue-500 hover:text-blue-700 mb-4 transition"
        >
          <IoArrowBack size={24} /> Voltar
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          🐶 Cadastrar Pet
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
              Nome do Pet
            </label>
            <input
              type="text"
              name="nome_pet"
              value={form.nome_pet}
              onChange={handleChange}
              placeholder="Nome do pet (opcional)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Espécie
            </label>
            <select
              name="especie"
              value={form.especie}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione...</option>
              <option value="Cachorro">🐶 Cachorro</option>
              <option value="Gato">🐱 Gato</option>
              <option value="Pássaro">🐦 Pássaro</option>
              <option value="Outro">🐾 Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione...</option>
              <option value="desaparecido">🔴 Desaparecido</option>
              <option value="encontrado">🟡 Encontrado</option>
              <option value="resgatado">🟢 Resgatado</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Localização
            </label>
            <input
              type="text"
              name="localizacao"
              value={form.localizacao}
              onChange={handleChange}
              required
              placeholder="Ex: Centro, Araraquara - SP"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descreva o pet: cor, porte, características..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* URL da Foto + Preview */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              URL da Foto
            </label>
            <input
              type="text"
              name="foto_url"
              value={form.foto_url}
              onChange={handleChange}
              placeholder="Cole o link da foto (opcional)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Preview aparece quando tem URL */}
            {form.foto_url && (
              <img
                src={form.foto_url}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>

          <button
            type="submit"
            className=" cursor-pointer bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-2"
          >
            Cadastrar Pet
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroPet;
