class Tabelas {
	init(conexao) {
		this.conexao = conexao
		this.criarAtendimentos()
		this.criarPets()
	}

	criarAtendimentos() {
		const sql = `CREATE TABLE IF NOT EXISTS 
            Atendimentos (
                id int NOT NULL AUTO_INCREMENT, 
                cliente varchar(11) NOT NULL, 
                pet varchar (20), 
                servico varchar(20) NOT NULL, 
                status varchar(20) NOT NULL, 
                observacoes text, 
                data date NOT NULL,
                dataCriacao date NOT NULL,
                PRIMARY KEY(id))`

		this.conexao.query(sql, (erro) => {
			if (erro) {
				console.log(erro)
			} else {
				console.log("'Atendimentos' criada")
			}
		})
	}

	criarPets() {
		const sql = `CREATE TABLE IF NOT EXISTS 
			Pets(
				id int NOT NULL AUTO_INCREMENT,
				nome varchar(50),
				imagem varchar(200),
				PRIMARY KEY (id))`
		this.conexao.query(sql, (erro, resultado) => {
			if (erro) {
				console.log(erro)
			} else {
				console.log("'Pets' criada")
			}
		})
	}
}

module.exports = new Tabelas()
