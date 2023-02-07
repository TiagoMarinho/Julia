export default {
	"name": "ask",
	"description": "Ask the bot something",
	"name_localizations": {
		"pt-BR": "perguntar"
	},
	"description_localizations": {
		"pt-BR": "Perguntar algo para o bot"
	},
	"type": 1,
	"options": [
		{
			"type": 3,
			"name": "question",
			"description": "What you want to ask to the bot",
			"description_localizations": {
				"pt-BR": "O que você quer perguntar para o bot"
			},
			"required": true
		},
		{
			"type": 5,
			"name": "private",
			"description": "Send response in a message only you can see",
			"name_localizations": {
				"pt-BR": "privado"
			},
			"description_localizations": {
				"pt-BR": "Responder com uma mensagem que só você poderá ver"
			},
			"required": false
		}
	]
}