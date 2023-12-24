import endpoints from "./endpoints.json" assert { type: 'json' }
import Queue from "../queue.mjs"

const queue = new Queue()

export default async (prompt, negativePrompt = "") => {
	const payload = {
		prompt,
		'max_new_tokens': 200,
		'mode': 'chat',  // Valid options: 'chat', 'chat-instruct', 'instruct'
        'stop_at_newline': false,

		// Generation params. If 'preset' is set to different than 'None', the values
		// in presets/preset-name.yaml are used instead of the individual numbers.
		//'preset': 'None',  
		'do_sample': true,
		'temperature': 0.8,
		'top_p': 0.9,
		'typical_p': 1,
		'epsilon_cutoff': 0, // In units of 1e-4
		'eta_cutoff': 0, // In units of 1e-4
		'tfs': 1,
		'top_a': 0,
		'repetition_penalty': 1.15,
		'top_k': 20,
		'min_length': 1,
		'no_repeat_ngram_size': 0,
		'num_beams': 1,
		'penalty_alpha': 0,
		'length_penalty': 1.5,
		'early_stopping': false,
		'mirostat_mode': 0,
		'mirostat_tau': 5,
		'mirostat_eta': 0.1,
        //'guidance_scale': 1.5,
        //'negative_prompt': negativePrompt,

		'seed': -1,
		'add_bos_token': true,
		'truncation_length': 8192,
		'ban_eos_token': false,
		'skip_special_tokens': true,
		//'stopping_strings': []
		'stopping_strings': ["USER:", "User:", "Assistant:", "ASSISTANT:"]
	}
	const endpoint = `${endpoints.oogabooga.address}/api/v1/generate`
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

	if (!data.content)
		console.error(data)

	if (response.status !== 200)
		console.error(data)

	return data.results[0].text
}