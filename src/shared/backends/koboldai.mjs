import endpoints from "./endpoints.json" assert { type: 'json' }
import Queue from "../queue.mjs"

const queue = new Queue()

export default async prompt => {
	const payload = {
			prompt,
			frmttriminc: true,
			singleline: true,
			frmtrmblln: true,
			temperature: 0.8,
			max_length: 256,
			max_context_length: 2048,
			//"top_p": 0.9,
			//"top_k": 0,
			//"top_a": 0.0,
			//"tfs": 0.68,
			//"typical": 1.0,
			rep_pen: 1.1,
			stop_sequence: ["You:", "You: ", "<|user|>", "\n"],
			use_memory: false,
			use_story: false,
			use_world_info: false
	}
	const endpoint = `${endpoints.koboldAI.address}/api/v1/generate/`
	const { id, response } = await queue.add(async _ => {
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

	const tokenConsumption = Math.floor(prompt.length / 3.5)
	const availableTokens = 2048 - tokenConsumption

	console.log(`${tokenConsumption} tokens used in this generation`)
	console.log(`${availableTokens} tokens were still available`)

	return data.results[0].text.trim()
}