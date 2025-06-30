// src/components/PromoSection.jsx

import React from "react";

function PromoSection({ clientes }) {
  // Filtra os clientes que atingiram pelo menos 8 lavagens
  const clientesComPromocao = clientes.filter(
    (c) => Number(c.lavagens) >= 8
  );

  // Mapeia os clientes com a quantidade de vezes que atingiram múltiplos de 8
  const listaPromo = clientesComPromocao.map((cliente, index) => ({
    ...cliente,
    vezes: Math.floor(Number(cliente.lavagens) / 8),
    numero: index + 1,
  }));

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">🏅 Clientes com Promoção Ativa</h2>

      {listaPromo.length === 0 ? (
        <p className="text-gray-300">Nenhum cliente atingiu a promoção ainda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listaPromo.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500"
            >
              <p className="font-semibold text-gray-800">
                O cliente número: <span className="text-blue-600">{cliente.numero}</span>,
              </p>
              <p className="uppercase">
                Nome: <span className="font-bold">{cliente.nome}</span>
              </p>
              <p>
                Já atingiu o valor promocional{" "}
                <span className="text-green-700 font-bold">{cliente.vezes}</span>{" "}
                {cliente.vezes === 1 ? "vez" : "vezes"}!
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PromoSection;
