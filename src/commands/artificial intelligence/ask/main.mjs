import { EmbedBuilder } from 'discord.js'
import data from './data.mjs'
import ask from '../../../shared/ask.mjs'

export default {
	data,
	async execute (interaction) {
		const ephemeral = interaction.options.getBoolean(`private`)
		await interaction.deferReply({ ephemeral })

		const question = interaction.options.getString(`question`)

		const content = await ask(question)

		await interaction.editReply({ content })
	}
}