import characters from '../characters/characters.json' assert { type: 'json' }
import Queue from './queue.mjs'

const worldInfoData = characters.julia.worldInfoData
const memory = characters.julia.memory
const story = characters.julia.story.join(`\n`)
const previousMessages = []
const MAX_PREVIOUS_MESSAGES_LENGTH = 28

const queue = new Queue()

export default async question => {

	const storyPayload = {
		name: "julia"
	}
	const storyEndpoint = `http://127.0.0.1:5000/api/v1/story/load/`

	const formattedQuestion = `You: ` + question.trim() + `\nJulia:`
	const chatHistory = previousMessages.join(``)

	const prompt = chatHistory + formattedQuestion

	const payload = {
			prompt,
			frmttriminc: true,
			//singleline: true,
			rep_pen: 1.3,
			frmtrmblln: true,
			temperature: 0.625,
			use_memory: true,
			use_story: true,
			use_world_info: true
	}
	const endpoint = `http://127.0.0.1:5000/api/v1/generate/`
	const response = await queue.add(async _ => {
		await fetch(storyEndpoint, {
			method: `put`,
			body: JSON.stringify(storyPayload),
			headers: {
				'Content-Type': 'application/json',
			}
		})
		return await fetch(endpoint, {
			method: `post`,
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			}
		})
	})

	const data = await response.json()

	const reply = data.results[0].text

	previousMessages.push(formattedQuestion, reply)

	if (previousMessages.length > MAX_PREVIOUS_MESSAGES_LENGTH)
		previousMessages.splice(0, 2)

	console.log("\x1b[32m" + prompt + "\x1b[36m\x1b[5m" + reply + "\x1b[0m")

	return reply
}