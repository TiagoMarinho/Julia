import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js'
import { regenerate, deleteEntry } from '../shared/ask.mjs'
import characters from '../shared/characters.mjs'
import blacklist from '../blacklist.json' assert { type: 'json' }

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isButton()) 
			return

		if (blacklist.includes(interaction.user.id))
			return //await interaction.reply({ content: `You are banned from using this button`, ephemeral: true })

		await interaction.deferUpdate()

		const identifiers = interaction.customId.split("-")
		switch (identifiers[0]) {
			case 'regen':
				await regenButtonResponse(interaction)
			break
			case 'del':
				//console.log(`USER TRIED DELETING: `, interaction.member.nickname)
				//return
				await deleteEntry(characters.default, identifiers[2])
				await interaction.deleteReply()
			break
		}
	},
}

const regenButtonResponse = async interaction => {
	const identifiers = interaction.customId.split("-")
	const id = identifiers[2]
	
	//const typing = interaction.channel.sendTyping()

	const { response } = await regenerate(characters.default, id)

	const regenButton = new ButtonBuilder()
		.setCustomId(`regen-1.0-${id}`)
		.setLabel('Redo')
		.setStyle(ButtonStyle.Success)

		const deleteButton = new ButtonBuilder()
			.setCustomId(`del-1.0-${id}`)
			.setLabel('Delete')
			.setStyle(ButtonStyle.Danger)

		const row = new ActionRowBuilder()
			.addComponents(regenButton, deleteButton)

	//await typing
	console.log(`REGENERATED: ${response}\nID: ${id}`)
	await interaction.editReply({ components: [row], content: response}).catch(console.error)
}