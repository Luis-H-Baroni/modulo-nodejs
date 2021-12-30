const query = require("../infraestrutura/database/queries")

class Atendimento {
	adiciona(atendimento) {
		const sql = "INSERT INTO Atendimentos SET ?"

		return query(sql, atendimento)
	}

	lista() {
		const sql = "SELECT * FROM Atendimentos ORDER BY id"

		return query(sql)
	}

	buscarId(id) {
		const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

		return query(sql, id)
	}

	altera(id, valores) {
		const sql = "UPDATE Atendimentos SET ? WHERE id = ?"

		return query(sql, [valores, id])
	}

	deleta(id) {
		const sql = `DELETE FROM Atendimentos WHERE id = ${id}`

		return query(sql, id)
	}
}

module.exports = new Atendimento()
