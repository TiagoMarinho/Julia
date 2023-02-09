import characters from "../../../shared/characters.mjs"

const characterChoices = Object.entries(characters)
	.map(([key, data]) => ({
		name: data.username, 
		value: key
	}))

export default {
	"name": "ask",
	"description": "Ask the bot something",
	"type": 1,
	"options": [
		{
			"type": 3,
			"name": "question",
			"description": "What you want to ask to the bot",
			"required": true
		},
		{
			"type": 3,
			"name": "character",
			"description": "What character you want to talk to",
			"choices": characterChoices,
			"required": false
		},
		{
			"type": 5,
			"name": "private",
			"description": "Send response in a message only you can see",
			"required": false
		}
	]
}