import endpoints from "./endpoints.json" assert { type: 'json' }
import Queue from "../queue.mjs"

const queue = new Queue()

export default async prompt => {
	const payload = {
			prompt,
			n_predict: 128,
			threads: 8,
			batch_size: 512,
			temperature: 0.8,
			"top_p": 0.9,
			//"top_k": 0,
			//"top_a": 0.0,
			//"tfs": 0.68,
			stop: [" You:", "You:", "You: ", "<|user|>", "\n", "###"],
			interactive: true
	}
	const endpoint = `${endpoints.llamacpp.address}/completion`
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

	if (!data.content)
		console.error(data)

	if (response.status !== 200)
		console.error(data)

	const tokenizerResponse = await fetch(`${endpoints.llamacpp.address}/tokenize`, {
		method: `post`,
		body: JSON.stringify({ content: prompt }),
		headers: {
			'Content-Type': 'application/json',
		}
	})
	const tokenizerData = await tokenizerResponse.json()
	console.log(tokenizerData)

	return data.content
}