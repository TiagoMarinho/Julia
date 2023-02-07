import characters from '../characters/characters.json' assert { type: 'json' }
import Queue from './queue.mjs'

const worldInfoData = characters.julia.worldInfoData
const memory = characters.julia.memory
const story = characters.julia.story.join(`\n`)
const previousMessages = []
const MAX_PREVIOUS_MESSAGES_LENGTH = 40

const queue = new Queue()

export default async question => {
	const formattedQuestion = `You: ` + question.trim() + `\nJulia:`

	const traits = worldInfoData.traits.join(`, `)
	const worldInfo = worldInfoData.name + `[${traits}]`
	const chatHistory = previousMessages.join(``)

	const prompt = [
		memory, `\n\n`, 
		worldInfo, `\n\n`, 
		story, `\n`, 
		chatHistory, 
		formattedQuestion
	].join(``)

	const payload = {
			prompt,
			frmttriminc: true,
			//singleline: true,
			frmtrmblln: true,
			temperature: 0.7,
	}
	const endpoint = `http://127.0.0.1:5000/api/v1/generate/`
	const response = await queue.add(async _ => await fetch(endpoint, {
		method: `post`,
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		}
	}))

	const data = await response.json()

	const reply = data.results[0].text

	previousMessages.push(formattedQuestion, reply)

	if (previousMessages.length > MAX_PREVIOUS_MESSAGES_LENGTH)
		previousMessages.splice(0, 2)

	console.log((prompt).replace(/[\n\r]/g, "*").replace(/ /g, "_"))

	return reply
}