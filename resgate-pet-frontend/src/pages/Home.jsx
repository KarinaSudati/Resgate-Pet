import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero */}
      <div className="bg-blue-400 text-white text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4">🐾 Resgate Pet</h1>
        <p className="text-xl mb-8 text-blue-100">
          Conectando pets perdidos e famílias que precisam de ajuda durante
          enchentes
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/cadastro-pet"
            className="bg-white text-blue-400 font-bold px-6 py-3 rounded-full hover:bg-blue-100 transition"
          >
            Cadastrar Pet
          </Link>
          <Link
            to="/pets"
            className="border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-blue-500 transition"
          >
            Ver Pets
          </Link>
          <Link
            to="/cadastro-lar"
            className="bg-yellow-200 text-blue-900 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
          >
            Oferecer Lar Temporário
          </Link>
        </div>
      </div>

      {/* Cards informativos */}
      <div className="max-w-5xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-4xl mb-3">🐶</div>
          <h2 className="text-xl font-bold text-blue-700 mb-2">Pet Perdido?</h2>
          <p className="text-gray-600">
            Cadastre seu pet e ajude outras pessoas a encontrá-lo.
          </p>
          <Link
            to="/cadastro-pet"
            className="mt-4 inline-block text-blue-500 font-semibold hover:underline"
          >
            Cadastrar agora →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-4xl mb-3">🏠</div>
          <h2 className="text-xl font-bold text-blue-700 mb-2">Tem Espaço?</h2>
          <p className="text-gray-600">
            Ofereça um lar temporário para pets que precisam de abrigo.
          </p>
          <Link
            to="/cadastro-lar"
            className="mt-4 inline-block text-blue-500 font-semibold hover:underline"
          >
            Oferecer lar →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-xl font-bold text-blue-700 mb-2">
            Encontrou um Pet?
          </h2>
          <p className="text-gray-600">
            Veja os pets cadastrados e ajude a reunir famílias.
          </p>
          <Link
            to="/pets"
            className="mt-4 inline-block text-blue-500 font-semibold hover:underline"
          >
            Ver pets →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
