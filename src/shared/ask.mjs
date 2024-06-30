import koboldClientAPI from './backends/koboldai.mjs'
import koboldHordeAPI from './backends/koboldai.mjs'
import llamacppAPI from './backends/llamacpp.mjs'
import openaiAPI from './backends/openai.mjs'
import crypto from 'crypto'

const MAX_PREVIOUS_MESSAGES_LENGTH = 256

const sleep = ms => 
	new Promise(resolve => {
		setTimeout(resolve, ms)
	})

const ask = async (username, character, question, history = character.chatHistory) => {

	const messages = history
		//.slice(MAX_PREVIOUS_MESSAGES_LENGTH * -1)
		.map(entry => [
			{
				role: "user",
				content: entry.prompt
			},
			{
				role: "assistant",
				content: entry.response
			}
		])
		.flat()

	messages.push({
		role: "user",
		content: question.trim()
	})

	const response = (await openaiAPI(username, messages, "", character)).trim()

	console.log("\x1b[32m" + question.trim() + " " + "\x1b[36m\x1b[5m" + response + "\x1b[0m")

	return response
}

export const generate = async (username, character, question) => {
	//const s = sleep(14000)
	const response = await ask(username, character, question)
	//await s
	const id = crypto.randomBytes(10).toString('hex')
	console.log(`GENERATED: ${id}`)

	const historyEntry = {
		id, 
		chatHistory: [...character.chatHistory],
		prompt: question, 
		response: response
	}
	character.chatHistory.push(historyEntry)

	return { id, response }
}

export const regenerate = async (username, character, id) => {
	const entry = character.chatHistory.find(e => e.id === id)

	if (typeof entry === "undefined")
		return false

	const response = await ask(character, entry.prompt, entry.chatHistory)

	entry.response = response

	return { id, response }
}

export const deleteEntry = async (character, id) => {
	console.log(character.chatHistory)
	const entryIndex = character.chatHistory.findIndex(e => e.id === id)
	console.log(id, entryIndex)

	if (entryIndex === -1)
		return false

	const entry = character.chatHistory[entryIndex]
	character.chatHistory.splice(entryIndex, 1)
	console.log("DELETED: ", id, entry)
	
	return true
}