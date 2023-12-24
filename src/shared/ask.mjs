import koboldClientAPI from './backends/koboldai.mjs'
import koboldHordeAPI from './backends/koboldai.mjs'
import llamacppAPI from './backends/llamacpp.mjs'
import oogaboogaAPI from './backends/oogabooga.mjs'

const MAX_PREVIOUS_MESSAGES_LENGTH = 256
let lastId = 0

const ask = async (character, question, history = character.chatHistory) => {

	const promptPrefix = `USER: `
	const responsePrefix = `ASSISTANT: `

	const chatHistory = history
		.slice(MAX_PREVIOUS_MESSAGES_LENGTH * -1)
		.map(entry => [
			promptPrefix + entry.prompt, 
			responsePrefix + entry.response
		])
		.flat()
		.join(`\n`)

	const formattedQuestion = question.trim()

	const prompt = [
		character.summary,
		chatHistory,
		character.addendum,
		promptPrefix + formattedQuestion,
		responsePrefix.trim()
	].join(`\n`)

	const response = (await oogaboogaAPI(prompt)).trim()

	console.log("\x1b[32m" + prompt + " " + "\x1b[36m\x1b[5m" + response + "\x1b[0m")

	return response
}

export const generate = async (character, question) => {
	const response = await ask(character, question)

	const historyEntry = {
		id: ++lastId, 
		chatHistory: [...character.chatHistory],
		prompt: question, 
		response: response
	}
	character.chatHistory.push(historyEntry)

	return { id: lastId, response }
}

export const regenerate = async (character, id) => {
	const entry = character.chatHistory.find(e => e.id === id)

	if (typeof entry === "undefined")
		return false

	console.log(id, character.chatHistory, entry)
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