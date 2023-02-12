![Banner image](https://i.imgur.com/xsnMbwK.png")

## Table of Contents

1. [About](#about)
2. [How to use](#how-to-use)
3. [Features](#features)
4. [Commands](#commands)
5. [Installation](#installation)
6. [Running](#running)
7. [Contributing](#contributing)

## About

Julia is a lightweight Discord bot that communicates with [KoboldAI Client](https://github.com/KoboldAI/KoboldAI-Client) API to generate plausible text conversations with artificial intelligence models.

## How to use

Julia can be used through slash commands with `/ask <question>` or by mentioning her or replying to her messages.

> You: @Julia What is your hair color?
>
> Julia: It's black actually.

## Features

- Slash commands
- Responds to mentions and replies

## Commands

* `/ask <question>`
* `/ping`

## Installation

1. Install https://github.com/KoboldAI/KoboldAI-Client and its dependencies
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

## Running

1. Launch KoboldAI Client and wait for it to finish loading
2. Select a model and set it to chat mode
3. Run `node .` inside Julia's root folder to launch Julia

# Contributing

Contributions, even in the form of creating new issues, are more than welcome! 

Here's a basic overview of the project structure for new contributors to get used to the code base:

* `src/main.mjs` is the entry point
* `src/commands/<category>/<command name>/main.mjs` is the file for a given command.
* `src/shared/characters.json` contains the available characters for the bot.
