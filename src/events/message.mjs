import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js'
import { generate } from '../shared/ask.mjs'
import characters from '../shared/characters.mjs'
import blacklist from '../blacklist.json' assert { type: 'json' }

export default {
	name: Events.MessageCreate,
	async execute(interaction) {
		if (!interaction.mentions.has(interaction.client.user)) 
			return
			
		if (blacklist.includes(interaction.author.id))
			return

		const mentionRegex = new RegExp(`<@${interaction.client.user.id}>`, "g");
		const question = interaction.content.replace(mentionRegex, ``).trim()

		if (question.length === 0)
			return
		
		const typing = interaction.channel.sendTyping()

		const { id, response } = await generate(characters.default, question)

		const regenButton = new ButtonBuilder()
			.setCustomId(`regen-1.0-${id}`)
			.setLabel('Redo')
			.setStyle(ButtonStyle.Success)

		const row = new ActionRowBuilder()
			.addComponents(regenButton)

		await typing
		await interaction.reply({ components: [row], content: response}).catch(console.error)
	},
}