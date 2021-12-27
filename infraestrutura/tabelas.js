class Tabelas {
	init(conexao) {
		this.conexao = conexao
		this.criarAtendimentos()
	}

	criarAtendimentos() {
		const sql = `CREATE TABLE IF NOT EXISTS 
            Atendimentos (
                id int NOT NULL AUTO_INCREMENT, 
                cliente varchar(50) NOT NULL, 
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
}

module.exports = new Tabelas()
