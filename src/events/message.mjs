import { Events } from 'discord.js'
import ask from '../shared/ask.mjs'
import characters from '../shared/characters.mjs'

export default {
	name: Events.MessageCreate,
	async execute(interaction) {
		if (!interaction.mentions.has(interaction.client.user)) 
			return

		const mentionRegex = new RegExp(`<@${interaction.client.user.id}>`, "g");
		const question = interaction.content.replace(mentionRegex, ``).trim()

		if (question.length === 0)
			return
		
		const typing = interaction.channel.sendTyping();

		const content = await ask(characters.default, question)

		await typing
		await interaction.reply(content).catch(console.error)
	},
}