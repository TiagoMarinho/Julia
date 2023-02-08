<h1 align="center"><img src="https://i.imgur.com/0ALd1j2.png" width="128"><br/>Julia</h1>
<p align="center">Artificial intelligence chat bot for Discord</p>

## Table of Contents

1. [How to use](#how-to-use)
2. [Features](#features)
3. [About](#more-about-julia)
3. [Commands](#commands)
3. [Installation](#installation)
4. [Running](#running)
5. [Contributing](#contributing)

## How to use

`You: @Julia What is your hair color?`

`Julia: It's black actually.`

## Features

- Slash commands
- Responds to mentions and replies

## More about Julia

Julia works by communicating with [KoboldAI Client](https://github.com/KoboldAI/KoboldAI-Client) API to generate text using artificial intelligence.

## Commands

* `/ask <question>`
* `/ping`

## Installation

1. Install https://github.com/KoboldAI/KoboldAI-Client and its dependencies
	* Run `update-koboldai.bat` and switch to United if you intend to use Pygmalion model (recommended)
2. Install NodeJS
3. Run `git clone https://github.com/TiagoMarinho/Julia` to clone Julia's repo
4. Create a new Discord application in the [Discord Developer Portal](https://discord.com/developers/applications)
5. Copy the token and client id of your new discord application and put it in `Julia/config.json`, like this:

	```json
	{
		"token": "TOKEN HERE",
		"clientId": "CLIENT ID HERE",
	}
	```
6. Install dependencies by running `npm install` inside Julia's root folder
7. Run `node src/register-commands.mjs` inside Julia's root folder to register slash commands for the bot.
8. Add a `julia.json` file to KoboldAI-Client `stories` folder. That will be the story used by Julia to define her character.

## Running

1. Launch KoboldAI Client and wait for it to finish loading
2. Select a model and set it to chat mode
3. Run `node .` inside Julia's root folder to launch Julia

# Contributing

Contributions, even in the form of creating new issues, are more than welcome! 

Here's a basic overview of the project structure for new contributors to get used to the code base:

* `src/main.mjs` is the entry point
* `src/commands/<category>/<command name>/main.mjs` is the file for a given command.
