import { Events } from 'discord.js'
import ask from '../shared/ask.mjs'

export default {
	name: Events.MessageCreate,
	async execute(interaction) {
		if (!interaction.mentions.has(interaction.client.user)) 
			return

		const question = interaction.content.replace(`<@${interaction.client.user.id}>`, ``).trim()

		const content = await ask(question)

		await interaction.reply(content).catch(console.error)
	},
}