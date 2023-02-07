import { EmbedBuilder } from "discord.js"

const dreamResponseComponent = interaction => {
	results = []

	interaction.reply(`Dreaming...`)

	return {
		add (result) {
			this.results.push(result)
			this.update()
		},
		update () {
			
		}
	}
}