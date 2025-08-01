import React from "react";

function TrashSection({ lixeira = [], onRestaurar,  onClear }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">
        🗑️ Lixeira ({lixeira.length})
      </h2>

      {lixeira.length === 0 ? (
        <p className="text-gray-300">Nenhum cliente na lixeira.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {lixeira.map((cliente) => (
              <li
                key={cliente.id}
                className="bg-white rounded p-3 flex justify-between items-center shadow"
              >
                <span className="font-semibold">
                  {cliente.nome} - {cliente.modelo} ({cliente.placa})
                </span>
                <button
                  onClick={() => onRestaurar(cliente.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Restaurar
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={onClear}
            className="mt-4 bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded shadow cursor-pointer"
          >
            Esvaziar Lixeira
          </button>
        </>
      )}
    </div>
  );
}

export default TrashSection;
