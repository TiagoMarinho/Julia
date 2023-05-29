import endpoints from "./endpoints.json" assert { type: 'json' }
import Queue from "../queue.mjs"

const queue = new Queue()

export default async prompt => {
	const payload = {
			"api_key": "0000000000",
			prompt,
			params: {
				frmttriminc: true,
				singleline: true,
				rep_pen: 1.15,
				frmtrmblln: true,
				temperature: 0.55,
				max_length: 80,
				max_context_length: 2048,
				"top_p": 0.2,
				"top_k": 0,
				"top_a": 0.0,
				//"tfs": 0.68,
				"typical": 1.0,
			},
			"models": [
				"Pygmalion 6b"
			],
	}
	const initEndpoint = `${endpoints.koboldHorde.address}/api/v2/generate/text/async/`
	const initResponse = await queue.add(async _ => {
		return await fetch(initEndpoint, {
			method: `post`,
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			}
		})
	})
	console.error(initResponse)

	const initData = await initResponse.json()

	if (initResponse.status !== 200)
		console.error(initData)

	const requestId = initData.id

	const statusEndpoint = `${endpoints.koboldHorde.address}/api/v2/generate/text/status/${requestId}`
	const statusResponse = await queue.add(async _ => {
		return await fetch(statusEndpoint, {
			method: `get`,
			headers: {
				'Content-Type': 'application/json',
			}
		})
	})
	const statusData = await statusResponse.json()

	console.log("aaaaaaaaaaa")
	console.log(statusData)
	console.log("aaaaaaaaaaa")

	const tokenConsumption = Math.floor(prompt.length / 3.5)
	const availableTokens = 2048 - tokenConsumption

	console.log(`${tokenConsumption} tokens used in this generation`)
	console.log(`${availableTokens} tokens were still available`)

	return data.results[0].text.trim()
}