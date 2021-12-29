const Atendimento = require("../models/atendimentosM")

module.exports = (app) => {
	app.get("/atendimentos", (req, res) => {
		Atendimento.lista()
			.then((resultados) => res.status(200).json(resultados))
			.catch((erros) => res.status(400).json(erros))
	})

	app.get("/atendimentos/:id", (req, res) => {
		const id = parseInt(req.params.id)
		Atendimento.buscarId(id, res)
	})

	app.post("/atendimentos", (req, res) => {
		let atendimento = req.body
		Atendimento.adiciona(atendimento)
			.then((atendimentoCadastrado) =>
				res.status(201).json(atendimentoCadastrado)
			)
			.catch((erros) => res.status(400).json(erros))
	})

	app.patch("/atendimentos/:id", (req, res) => {
		const id = parseInt(req.params.id)
		const valores = req.body
		Atendimento.altera(id, valores, res)
	})

	app.delete("/atendimentos/:id", (req, res) => {
		const id = parseInt(req.params.id)
		Atendimento.deleta(id, res)
	})
}
