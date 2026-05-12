// componente para exibir as informações de um pet em um card
function PetCard({ pet }) {
  const statusCor = (status) => {
    if (status === "desaparecido") return "bg-red-100 text-red-600";
    if (status === "encontrado") return "bg-yellow-100 text-yellow-600";
    if (status === "resgatado") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  const statusEmoji = (status) => {
    if (status === "desaparecido") return "🔴";
    if (status === "encontrado") return "🟡";
    if (status === "resgatado") return "🟢";
    return "⚪";
  };

  const especieEmoji = (especie) => {
    if (especie === "Cachorro") return "🐶";
    if (especie === "Gato") return "🐱";
    if (especie === "Pássaro") return "🐦";
    return "🐾";
  };

  return (
    <div className="flx flex-col flex-1">
      {/* Foto */}
      {pet.foto_url ? (
        <img
          src={pet.foto_url}
          alt={pet.nome_pet}
          className="w-full h-48 object-cover shrink-0"
        />
      ) : (
        <div className="w-full h-48 bg-blue-50 flex items-center justify-center text-7xl shrink-0">
          {especieEmoji(pet.especie)}
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        {/* Nome e status */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">
            {pet.nome_pet || "Sem nome"}
          </h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${statusCor(pet.status)}`}
          >
            {statusEmoji(pet.status)} {pet.status}
          </span>
        </div>

        {/* Informações */}
        <div className="flex flex-col gap-1 mb-3">
          <p className="text-gray-500 text-sm">
            {especieEmoji(pet.especie)} {pet.especie}
          </p>
          <p className="text-gray-500 text-sm">📍 {pet.localizacao}</p>
        </div>

        {/* Descrição */}
        <div className="flex-1">
          {pet.descricao && (
            <p className="text-gray-600 text-sm border-t pt-3 line-clamp-2">
              {pet.descricao}
            </p>
          )}
        </div>

        {/* Data */}
        <p className="text-gray-400 text-xs mt-3">
          📅 {new Date(pet.data_postagem).toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

export default PetCard;
