import koboldClientAPI from './backends/koboldai.mjs'
import koboldHordeAPI from './backends/koboldai.mjs'

const MAX_PREVIOUS_MESSAGES_LENGTH = 16

export default async (character, question) => {

	const chatHistory = character.chatHistory.slice(MAX_PREVIOUS_MESSAGES_LENGTH * -1).join(`\n`)
	const questionPrefix = `You: `
	const formattedQuestion = question.trim()
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
		questionPrefix,
		formattedQuestion, `\n`,
		responsePrefix
	].join(``)

	const reply = await koboldClientAPI(prompt)

	character.chatHistory.push(
		questionPrefix + formattedQuestion, 
		responsePrefix + " " + reply
	)

	console.log("\x1b[32m" + prompt + " " + "\x1b[36m\x1b[5m" + reply + "\x1b[0m")

	return reply
}