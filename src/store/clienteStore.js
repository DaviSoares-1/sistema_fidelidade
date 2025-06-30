// src/store/clienteStore.jsx

import { create } from "zustand";

export const useClienteStore = create((set) => ({
  clientes: formatarNumeracao(JSON.parse(localStorage.getItem("clientes")) || []),
  lixeira: JSON.parse(localStorage.getItem("lixeira")) || [],

  adicionarCliente: (cliente) =>
    set((state) => {
      const atualizado = formatarNumeracao([...state.clientes, cliente]);
      localStorage.setItem("clientes", JSON.stringify(atualizado));
      return { clientes: atualizado };
    }),

  atualizarCliente: (clienteAtualizado) =>
    set((state) => {
      const atualizado = formatarNumeracao(
        state.clientes.map((c) =>
          c.id === clienteAtualizado.id ? clienteAtualizado : c
        )
      );
      localStorage.setItem("clientes", JSON.stringify(atualizado));
      return { clientes: atualizado };
    }),

  excluirCliente: (id) =>
    set((state) => {
      const clienteParaLixeira = state.clientes.find((c) => c.id === id);
      const clientesAtualizados = formatarNumeracao(
        state.clientes.filter((c) => c.id !== id)
      );
      const lixeiraAtualizada = [...state.lixeira, clienteParaLixeira];
      localStorage.setItem("clientes", JSON.stringify(clientesAtualizados));
      localStorage.setItem("lixeira", JSON.stringify(lixeiraAtualizada));
      return { clientes: clientesAtualizados, lixeira: lixeiraAtualizada };
    }),

  restaurarCliente: (id) =>
    set((state) => {
      const clienteRestaurado = state.lixeira.find((c) => c.id === id);
      const lixeiraAtualizada = state.lixeira.filter((c) => c.id !== id);
      const clientesAtualizados = formatarNumeracao([
        ...state.clientes,
        clienteRestaurado
      ]);
      localStorage.setItem("clientes", JSON.stringify(clientesAtualizados));
      localStorage.setItem("lixeira", JSON.stringify(lixeiraAtualizada));
      return { clientes: clientesAtualizados, lixeira: lixeiraAtualizada };
    }),

  esvaziarLixeira: () =>
    set(() => {
      localStorage.setItem("lixeira", JSON.stringify([]));
      return { lixeira: [] };
    })
}));

// ✅ Utilitário que adiciona a numeração sequencial aos clientes
function formatarNumeracao(lista) {
  return lista.map((cliente, index) => ({
    ...cliente,
    numero: (index + 1).toString()
  }));
}
