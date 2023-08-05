import { generate } from '../../../shared/ask.mjs'
import characters from '../../../shared/characters.mjs'

const compareDates = (date1, date2, epsilon) => 
	date1 - epsilon <= date2 && date1 + epsilon >= date2

export default {
	data: {
        "name": "Answer",
        "type": 3,
    },
	async execute (interaction) {
		
		const character = characters.default
		const message = interaction.targetMessage.content
		const link = interaction.targetMessage.url
		const username = interaction.targetMessage.author.username
		const tag = `<@${interaction.targetMessage.author.id}>`

		const mentionRegex = new RegExp(`<@${interaction.client.user.id}>`, "g");
		const question = message.replace(mentionRegex, ``).trim()
		
		if (question.length === 0)
			return

		await interaction.deferReply()
		
		const { response } = await generate(character, question)

		const content = `> ${tag}: ${message} [original](${link})\n\n${await response}`

		await interaction.editReply({ content })
	}
}