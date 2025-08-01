import React, { useEffect, useState } from "react"
import ClienteFormModal from "./components/ClienteFormModal"
import ClienteTable from "./components/ClienteTable"
import TrashSection from "./components/TrashSection"
import PromoSection from "./components/PromoSection"
import FeedbackAlert from "./components/FeedbackAlert"
import { useClienteStore } from "./store/clienteStore"
import { exportToPDF } from "./utils/exportToPDF"

function App() {
	const {
		clientes,
		lixeira,
		adicionarCliente,
		atualizarCliente,
		excluirCliente,
		restaurarCliente,
		esvaziarLixeira
	} = useClienteStore()

	const [mostrarModal, setMostrarModal] = useState(false)
	const [clienteEditando, setClienteEditando] = useState(null)
	const [filtro, setFiltro] = useState("")
	const [clientesFiltrados, setClientesFiltrados] = useState(clientes)
	const [feedback, setFeedback] = useState("")
	const [tipoFeedback, setTipoFeedback] = useState("")

	useEffect(() => {
		setClientesFiltrados(clientes)
	}, [clientes])

	const handleCadastro = (dados) => {
		if (clienteEditando) {
			atualizarCliente(dados)
			setFeedback("Cliente atualizado com sucesso!")
			setTipoFeedback("update")
		} else {
			const novo = {
				...dados,
				id: Date.now().toString(),
				numero: (clientes.length + 1).toString(), // numeração fixa e persistente
				data: new Date().toLocaleString("pt-BR", {
					day: "2-digit",
					month: "2-digit",
					year: "2-digit",
					hour: "2-digit",
					minute: "2-digit"
				})
			}
			adicionarCliente(novo)
			setFeedback("Cliente cadastrado com sucesso!")
			setTipoFeedback("success")
		}

		setMostrarModal(false)
		setClienteEditando(null)
	}

	const handleEditar = (cliente) => {
		setClienteEditando(cliente)
		setMostrarModal(true)
	}

	const handleExcluir = (id) => {
		excluirCliente(id)
		setFeedback("Cliente excluído (movido para lixeira)!")
		setTipoFeedback("delete")
	}

	const handleRestaurar = (id) => {
		restaurarCliente(id)
		setFeedback("Cliente restaurado com sucesso!")
		setTipoFeedback("restore")
	}

	const handleEsvaziar = () => {
		esvaziarLixeira()
		setFeedback("Lixeira esvaziada!")
		setTipoFeedback("trashClear")
	}

	const handleFiltrar = () => {
		const texto = filtro.trim()

		if (!texto) {
			setFeedback("Digite um valor válido para filtrar.")
			setTipoFeedback("notFound")
			return
		}

		let filtrados = []

		if (/^\d+$/.test(texto)) {
			filtrados = clientes.filter((c) => c.numero === texto)
		} else {
			const textoUpper = texto.toUpperCase()
			filtrados = clientes.filter(
				(c) =>
					c.nome.toUpperCase().includes(textoUpper) ||
					c.modelo.toUpperCase().includes(textoUpper) ||
					c.placa.toUpperCase().includes(textoUpper)
			)
		}

		if (filtrados.length === 0) {
			setFeedback("Nenhum cliente encontrado.")
			setTipoFeedback("notFound")
			return
		}

		setClientesFiltrados(filtrados)
		setFiltro("")
		setFeedback("")
	}

	const limparFiltro = () => {
		setClientesFiltrados(clientes)
		setFiltro("")
		setFeedback("")
	}

	const exportarPDF = () => {
		exportToPDF(clientes)
	}

	return (
		<div
			className="min-h-screen p-6"
			style={{ backgroundColor: "oklch(70.7% .022 261.325)" }}
		>
			<h1 className="text-3xl font-bold text-center text-white mb-6">
				📘 Sistema de Fidelidade - JJ LAVA-JATO
			</h1>

			<FeedbackAlert message={feedback} type={tipoFeedback} />

			<div className="flex flex-col md:flex-row flex-wrap items-center gap-4 mb-6">
				<button
					onClick={() => {
						setMostrarModal(true)
						setClienteEditando(null)
					}}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
				>
					Adicionar Cliente
				</button>

				<input
					type="text"
					placeholder="Filtrar por nome, modelo, placa ou número"
					value={filtro}
					onChange={(e) => setFiltro(e.target.value.toUpperCase())}
					className="flex-1 p-2 rounded shadow w-full md:w-auto bg-gray-500 text-white"
				/>

				<button
					onClick={handleFiltrar}
					className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow cursor-pointer"
				>
					Buscar
				</button>

				<button
					onClick={limparFiltro}
					className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow cursor-pointer"
				>
					Limpar Filtro
				</button>

				<button
					onClick={exportarPDF}
					className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow cursor-pointer"
				>
					Baixar PDF
				</button>
			</div>

			<div className="overflow-x-auto">
				<ClienteTable
					clientes={clientesFiltrados}
					onEditar={handleEditar}
					onExcluir={handleExcluir}
				/>
			</div>

			<TrashSection
				lixeira={lixeira}
				onClear={handleEsvaziar}
				onRestaurar={handleRestaurar}
			/>

			<PromoSection clientes={clientes} />

			{mostrarModal && (
				<ClienteFormModal
					clienteEditando={clienteEditando}
					onClose={() => {
						setMostrarModal(false)
						setClienteEditando(null)
					}}
					onSubmit={handleCadastro}
				/>
			)}
		</div>
	)
}

export default App
