import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js'
import { regenerate } from '../shared/ask.mjs'
import characters from '../shared/characters.mjs'
import blacklist from '../blacklist.json' assert { type: 'json' }

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isButton()) 
			return

		await interaction.deferUpdate()

		const id = parseFloat(interaction.customId.split("-")[2])
		
		//const typing = interaction.channel.sendTyping()

		const { response } = await regenerate(characters.default, id)

		const regenButton = new ButtonBuilder()
			.setCustomId(`regen-1.0-${id}`)
			.setLabel('Redo')
			.setStyle(ButtonStyle.Success)

		const row = new ActionRowBuilder()
			.addComponents(regenButton)

		//await typing
		await interaction.editReply({ components: [row], content: response}).catch(console.error)
	},
}