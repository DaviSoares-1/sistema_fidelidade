import React from "react";

function ClienteTable({ clientes, onEditar, onExcluir }) {
  return (
    <table className="w-full text-white border-collapse border border-gray-600 shadow-md">
      <thead className="bg-gray-700">
        <tr>
          <th className="border border-gray-600 px-3 py-2 text-left">Numeração</th>
          <th className="border border-gray-600 px-3 py-2 text-left">Data</th>
          <th className="border border-gray-600 px-3 py-2 text-left">Nome do Cliente</th>
          <th className="border border-gray-600 px-3 py-2 text-left">Modelo do Veículo</th>
          <th className="border border-gray-600 px-3 py-2 text-left">Placa do Veículo</th>
          <th className="border border-gray-600 px-3 py-2 text-left">Quantidade de Lavagens</th>
          <th className="border border-gray-600 px-3 py-2 text-left">Preço Promocional</th>
          <th className="border border-gray-600 px-3 py-2 text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center py-6 text-gray-400">
              Nenhum cliente cadastrado.
            </td>
          </tr>
        ) : (
          clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-600 transition-colors">
              <td className="border border-gray-600 px-3 py-2">{cliente.numero}</td>
              <td className="border border-gray-600 px-3 py-2">
                {cliente.dataLavagem || "—"}
              </td>
              <td className="border border-gray-600 px-3 py-2">{cliente.nome}</td>
              <td className="border border-gray-600 px-3 py-2">{cliente.modelo}</td>
              <td className="border border-gray-600 px-3 py-2">{cliente.placa}</td>
              <td className="border border-gray-600 px-3 py-2">{cliente.lavagens}</td>
              <td className="border border-gray-600 px-3 py-2 text-center text-xl">
                {cliente.lavagens !== 0 && cliente.lavagens % 8 === 0 ? "✔️" : "❌"}
              </td>
              <td className="border border-gray-600 px-3 py-2 space-x-2">
                <button
                  onClick={() => onEditar(cliente)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onExcluir(cliente.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ClienteTable;
