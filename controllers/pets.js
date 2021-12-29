const Pet = require("../models/petsM")

module.exports = (app) => {
	app.post("/pet", (req, res) => {
		const pet = req.body

		Pet.adiciona(pet, res)
	})
}
