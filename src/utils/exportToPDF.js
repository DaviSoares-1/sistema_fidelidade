// src/utils/exportToPDF.js

import jsPDF from "jspdf";

export const exportToPDF = (clientes) => {
  const doc = new jsPDF();
  let y = 20;

  // Título
  doc.setFontSize(14);
  doc.text("Relatório de Fidelidade - JJ LAVA-JATO", 10, 10);

  doc.setFontSize(12);

  clientes.forEach((cliente, index) => {
    const promo = cliente.lavagens % 8 === 0 && cliente.lavagens !== 0 ? "SIM" : "NÃO";

    const linhas = [
      `Cliente #${index + 1}`,
      `- Nome: ${cliente.nome}`,
      `- Modelo: ${cliente.modelo}`,
      `- Placa: ${cliente.placa}`,
      `- Lavagens: ${cliente.lavagens}`,
      `- Promoção: ${promo}`,
      `- Data: ${cliente.dataLavagem || "—"}`,
    ];

    linhas.forEach((linha) => {
      const wrapped = doc.splitTextToSize(linha, 180); // quebra se passar de 180mm
      wrapped.forEach((parte) => {
        doc.text(parte, 10, y);
        y += 7;
      });
    });

    y += 5; // espaçamento extra entre clientes

    // Quebra de página automática
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  // Gerar nome do arquivo com data
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const fileName = `fidelidade_lista_${dia}-${mes}-${ano}.pdf`;

  doc.save(fileName);
};
