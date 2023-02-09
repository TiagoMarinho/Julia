import Queue from './queue.mjs'

const MAX_PREVIOUS_MESSAGES_LENGTH = 16

const queue = new Queue()

export default async (character, question) => {

	const chatHistory = character.chatHistory.join(`\n`)
	const formattedQuestion = `You: ` + question.trim()
	const responsePrefix = `${character.username}:`

	const persistentData = [
		character.memory,
		character.worldInfo,
		character.exampleDialogue.map(m => m.join(`\n`)).join(`\n\n`),
		character.story.join(`\n`)
	].join(`\n\n`)

	const prompt = [
		persistentData, `\n`, 
		chatHistory, chatHistory ? `\n` : "",
		formattedQuestion, `\n`,
		responsePrefix
	].join(``)

	const payload = {
			prompt,
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
			//use_memory: true,
			//use_story: true,
			//use_world_info: true
	}
	const endpoint = `http://127.0.0.1:5000/api/v1/generate/`
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

	const reply = data.results[0].text.trim()

	character.chatHistory.push(formattedQuestion, responsePrefix + " " + reply)

	if (character.chatHistory.length > MAX_PREVIOUS_MESSAGES_LENGTH)
		character.chatHistory.splice(0, 2)

	console.log("\x1b[32m" + prompt + " " + "\x1b[36m\x1b[5m" + reply + "\x1b[0m")

	return reply
}