import { EmbedBuilder } from 'discord.js'
import data from './data.mjs'
import { generate } from '../../../shared/ask.mjs'
import characters from '../../../shared/characters.mjs'

export default {
	data,
	async execute (interaction) {
		const ephemeral = interaction.options.getBoolean(`private`)
		await interaction.deferReply({ ephemeral })

		const question = interaction.options.getString(`question`)
		const characterKey = interaction.options.getString(`character`) ?? `default`

		const character = characters[characterKey]

		const content = await generate(character, question)

		await interaction.editReply({ content })
	}
}