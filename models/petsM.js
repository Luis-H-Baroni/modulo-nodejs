const conexao = require("../infraestrutura/database/conexao")
const uploadArquivos = require("../infraestrutura/arquivos/uploadArquivos")

class Pet {
	adiciona(pet, res) {
		const sql = `INSERT INTO Pets SET ?`

		uploadArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {
			if (erro) {
				res.status(400).json(erro)
			} else {
				const novoPet = { nome: pet.nome, imagem: novoCaminho }

				conexao.query(sql, novoPet, (erro, resultado) => {
					if (erro) {
						res.status(400).json(erro)
					} else {
						res.status(201).json({ novoPet, resultado })
					}
				})
			}
		})
	}
}

module.exports = new Pet()
