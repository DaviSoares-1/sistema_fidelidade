import React, { useEffect, useState } from "react"

const ClienteFormModal = ({ onClose, onSubmit, clienteEditando }) => {
	const [nome, setNome] = useState("")
	const [modelo, setModelo] = useState("")
	const [placa, setPlaca] = useState("")
	const [lavagens, setLavagens] = useState("")
	const [dataLavagem, setDataLavagem] = useState("")
	const [erro, setErro] = useState("")

	useEffect(() => {
		if (clienteEditando) {
			setNome(clienteEditando.nome || "")
			setModelo(clienteEditando.modelo || "")
			setPlaca(clienteEditando.placa || "")
			setLavagens(clienteEditando.lavagens?.toString() || "")
			setDataLavagem(
				clienteEditando.dataLavagem
					? clienteEditando.dataLavagem.split("/").reverse().join("-")
					: ""
			)
		} else {
			setNome("")
			setModelo("")
			setPlaca("")
			setLavagens("")
			setDataLavagem("")
		}
		setErro("")
	}, [clienteEditando])

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!nome || !modelo || !placa || lavagens === "") {
			setErro("Preencha todos os campos.")
			return
		}

		const lavagensNum = parseInt(lavagens, 10)
		if (isNaN(lavagensNum) || lavagensNum < 0) {
			setErro("A quantidade de lavagens deve ser um número positivo.")
			return
		}

		const dataFormatada = dataLavagem
			? (() => {
					const [ano, mes, dia] = dataLavagem.split("-")
					return `${dia}/${mes}/${ano.slice(-2)}`
			  })()
			: ""

		onSubmit({
			...clienteEditando,
			nome: nome.trim().toUpperCase(),
			modelo: modelo.trim().toUpperCase(),
			placa: placa.trim().toUpperCase(),
			lavagens: lavagensNum,
			dataLavagem: dataFormatada
		})

		// Limpar os campos
		setNome("")
		setModelo("")
		setPlaca("")
		setLavagens("")
		setDataLavagem("")
		setErro("")
	}

	return (
		<div
			className="fixed inset-0 flex justify-center items-center z-50"
			style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
		>
			<div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
				<h2 className="text-xl font-bold mb-4 text-gray-800">
					{clienteEditando ? "Editar Cliente" : "Novo Cliente"}
				</h2>

				{erro && (
					<div className="bg-red-500 text-white p-2 mb-4 rounded">{erro}</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block font-semibold mb-1">Data da Lavagem</label>
						<input
							type="date"
							value={dataLavagem}
							onChange={(e) => setDataLavagem(e.target.value)}
							className="w-full p-2 rounded border"
						/>
					</div>

					<div>
						<label className="block font-semibold mb-1">Nome do Cliente</label>
						<input
							type="text"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							className="w-full p-2 rounded border"
							autoFocus
							required
						/>
					</div>

					<div>
						<label className="block font-semibold mb-1">
							Modelo do Veículo
						</label>
						<input
							type="text"
							value={modelo}
							onChange={(e) => setModelo(e.target.value)}
							className="w-full p-2 rounded border"
							required
						/>
					</div>

					<div>
						<label className="block font-semibold mb-1">Placa do Veículo</label>
						<input
							type="text"
							value={placa}
							onChange={(e) => setPlaca(e.target.value)}
							className="w-full p-2 rounded border"
							required
						/>
					</div>

					<div>
						<label className="block font-semibold mb-1">
							Quantidade de Lavagens
						</label>
						<input
							type="number"
							min="0"
							step="1"
							value={lavagens}
							onChange={(e) => setLavagens(e.target.value)}
							className="w-full p-2 rounded border"
							required
						/>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
						>
							{clienteEditando ? "Atualizar" : "Cadastrar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ClienteFormModal
