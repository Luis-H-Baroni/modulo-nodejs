const res = require("express/lib/response")
const moment = require("moment")
const conexao = require("../infraestrutura/conexao")

class Atendimento {
	adiciona(atendimento, res) {
		const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS")
		const data = moment(atendimento.data, "DD/MM/YYYY").format(
			"YYYY-MM-DD HH:MM:SS"
		)

		const validarData = moment(data).isSameOrAfter(dataCriacao)
		const validarCliente = atendimento.cliente.length >= 5
		const validacoes = [
			{
				nome: "data",
				mensagem: "Data deve ser igual ou maior a data atual",
				valido: validarData,
			},
			{
				nome: "cliente",
				mensagem: "Nome deve possuir 5 ou mais letras",
				valido: validarCliente,
			},
		]
		const erros = validacoes.filter((campo) => !campo.valido)
		const errosExistem = erros.length

		if (errosExistem) {
			res.status(400).json(erros)
		} else {
			const atendimentoDatado = { ...atendimento, dataCriacao, data }
			const sql = "INSERT INTO Atendimentos SET ?"
			conexao.query(sql, atendimentoDatado, (erro, resultado) => {
				if (erro) {
					res.status(400).json(erro)
				} else {
					res.status(201).json({ atendimento, resultado })
				}
			})
		}
	}
	lista(res) {
		const sql = "SELECT * FROM Atendimentos ORDER BY id"

		conexao.query(sql, (erro, resultado) => {
			if (erro) {
				res.status(400).json(erro)
			} else {
				res.status(200).json(resultado)
			}
		})
	}
	buscarId(id, res) {
		const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

		conexao.query(sql, (erro, resultado) => {
			const atendimento = resultado[0]
			if (erro) {
				res.status(400).json(erro)
			} else {
				res.status(200).json(atendimento)
			}
		})
	}
	altera(id, valores, res) {
		if (valores.data) {
			valores.data = moment(valores.data, "DD/MM/YYYY").format(
				"YYYY-MM-DD HH:MM:SS"
			)
		}
		const sql = "UPDATE Atendimentos SET ? WHERE id = ?"

		conexao.query(sql, [valores, id], (erro, resultado) => {
			if (erro) {
				res.status(400).json(erro)
			} else {
				res.status(200).json({ ...valores, id })
			}
		})
	}
	deleta(id, res) {
		const sql = `DELETE FROM Atendimentos WHERE id = ${id}`

		conexao.query(sql, (erro, resultado) => {
			if (erro) {
				res.status(400).json(erro)
			} else {
				res.status(200).json({ id, resultado })
			}
		})
	}
}

module.exports = new Atendimento()
