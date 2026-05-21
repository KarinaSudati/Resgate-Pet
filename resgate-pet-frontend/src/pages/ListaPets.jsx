import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PetCard from "../components/PetCard";
import { IoArrowBack } from "react-icons/io5";

function ListaPets() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [petEditando, setPetEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const buscarPets = () => {
    api
      .get("/pets")
      .then((response) => {
        setPets(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.log("Erro:", error);
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarPets();
  }, []);

  const handleEditar = (pet) => {
    setPetEditando({ ...pet });
  };

  const handleChange = (e) => {
    setPetEditando({ ...petEditando, [e.target.name]: e.target.value });
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pets/${petEditando.id}`, petEditando);
      setMensagem("✅ Pet atualizado com sucesso!");
      setPetEditando(null);
      buscarPets();
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      console.log("Erro:", error);
      setMensagem("❌ Erro ao atualizar pet.");
    }
  };

  const handleDeletar = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este pet?")) return;
    try {
      await api.delete(`/pets/${id}`);
      buscarPets();
    } catch (error) {
      console.log("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-1 text-blue-500 hover:text-blue-700 mb-6 transition"
        >
          <IoArrowBack size={24} /> Voltar
        </button>

        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          🐾 Pets Cadastrados
        </h2>

        {mensagem && (
          <p className="text-center mb-6 font-semibold text-blue-600">
            {mensagem}
          </p>
        )}

        {carregando && (
          <p className="text-center text-gray-500 text-lg">
            Carregando pets...
          </p>
        )}

        {!carregando && pets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🐶</p>
            <p className="text-gray-500 text-lg">
              Nenhum pet cadastrado ainda.
            </p>
          </div>
        )}

        {/* Grid de pets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <PetCard pet={pet} />
              <div className="flex gap-2 px-4 pb-4">
                <button
                  onClick={() => handleEditar(pet)}
                  className=" cursor-pointer flex-1 flex items-center justify-center gap-1 text-yellow-500 bg-yellow-50 hover:bg-yellow-100 font-medium py-1.5 rounded-full transition text-xs border border-yellow-200"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDeletar(pet.id)}
                  className=" cursor-pointer flex-1 flex items-center justify-center gap-1 text-red-400 bg-red-50 hover:bg-red-100 font-medium py-1.5 rounded-full transition text-xs border border-red-200"
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de edição */}
      {petEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">
              ✏️ Editar Pet
            </h3>

            <form onSubmit={handleSalvar} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Nome do Pet
                </label>
                <input
                  type="text"
                  name="nome_pet"
                  value={petEditando.nome_pet || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Espécie
                </label>
                <select
                  name="especie"
                  value={petEditando.especie}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
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
                  value={petEditando.status}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
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
                  value={petEditando.localizacao}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={petEditando.descricao || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  URL da Foto
                </label>
                <input
                  type="text"
                  name="foto_url"
                  value={petEditando.foto_url || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {petEditando.foto_url && (
                  <img
                    src={petEditando.foto_url}
                    alt="Preview"
                    className="mt-3 w-full h-48 object-cover rounded-lg border"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setPetEditando(null)}
                  className=" cursor-pointer flex-1 border-2 border-gray-300 text-gray-600 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className=" cursor-pointer flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaPets;
