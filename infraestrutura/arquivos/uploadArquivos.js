const fs = require("fs")
const path = require("path")
/* fs.readFile("./assets/salsicha.jpg", (erro, buffer) => {
	console.log("buffer ok")

	fs.writeFile("./assets/salsicha2.jpg", buffer, (erro) => {
		console.log("imagem escrita")
	})
}) */

module.exports = (caminho, nomeArquivo, callBackImagem) => {
	const tipo = path.extname(caminho)
	const tiposValidos = ["jpg", "png", "jpeg"]
	const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

	if (!tipoValido) {
		const erro = "Tipo de arquivo inválido"
		console.log("tipo invalido")
		callBackImagem(erro)
	} else {
		const novoCaminho = `./assets/imagens/${nomeArquivo}${tipo}`

		fs.createReadStream(caminho)
			.pipe(fs.createWriteStream(novoCaminho))
			.on("finish", () => callBackImagem(false, novoCaminho))
	}
}
