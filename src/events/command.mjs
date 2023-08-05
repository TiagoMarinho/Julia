import { Events } from 'discord.js'
import blacklist from '../blacklist.json' assert { type: 'json' }

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (blacklist.includes(interaction.user.id))
			return await interaction.reply({ content: `You are banned from using this command`, ephemeral: true })

		if (!interaction.isCommand() && !interaction.isContextMenuCommand())
			return

		const command = interaction.client.commands.get(interaction.commandName)

		if (!command) return

		console.log(`${interaction.user.tag} used ${interaction.commandName}`)

		try {
			await command.execute(interaction)
		} catch (error) {
			console.error(error)

			if (error.code === 10062) // bot took too long to respond/defer, trying to reply would crash it
				return

			if (interaction.replied)
				return
			
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
		}
	},
}