import fetch from 'node-fetch'
import endpoints from "./endpoints.json" assert { type: 'json' }
import Queue from "../queue.mjs"

const queue = new Queue()
const DYNAMIC_TEMPERATURE_DISTANCE = 0.3
const BASE_TEMPERATURE = 0.8
const MIN_TEMP = BASE_TEMPERATURE - DYNAMIC_TEMPERATURE_DISTANCE
const MAX_TEMP = BASE_TEMPERATURE + DYNAMIC_TEMPERATURE_DISTANCE

export default async (username, prompt, negativePrompt = "", character) => {
	const formattedPrompt = [...prompt]
	formattedPrompt.splice(-2, 0, {
		role: "system",
		content: character.addendum
	})
	console.log(username)
	const payload = {
		messages: formattedPrompt,
		context: character["context"],
		//'character': character.name,
		//'instruction_template': 'Llama-v2',
		'max_tokens': 200,
		'mode': 'chat',  // Valid options: 'chat', 'chat-instruct', 'instruct'
		'name1': username,
		"user": username,
		"your_name": username,
		"user_name": username,
		'name2': character.name,
		'temperature': 1,
		'truncation_length': 8192,
		'stop': "\n",
        'stop_at_newline': true,
		"top_p": 1,
		"top_k": 0,
		"typical_p": 1,
		"repetition_penalty": 1.1,
		"min_p": 0.05,
		"custom_token_bans": "1",
		"sampler_priority": [
			"temperature",
			"dynamic_temperature",
			"quadratic_sampling",
			"top_k",
			"top_p",
			"typical_p",
			"epsilon_cutoff",
			"eta_cutoff",
			"tfs",
			"top_a",
			"min_p",
			"mirostat",
		],
	}
	const endpoint = `${endpoints.openai.address}/v1/chat/completions`
	const response = await queue.add(async _ => {
		return await fetch(endpoint, {
			method: `post`,
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			}
		})
	})

	const data = await response.json()

	if (response.status !== 200)
		console.error(data)

	return data.choices[0].message.content
}