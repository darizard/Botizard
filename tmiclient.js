import { promises as fs } from 'fs'
import { client as Client } from 'tmi.js'

var client
var discordInterval = 1800000
var multiInterval = 1800000

export async function connect() {
	const botizardCreds = JSON.parse(await fs.readFile('./resources/creds/botizard.json', 'UTF-8'))

	client = new Client(botizardCreds.tmi)
	client.on('message', onMessageHandler_tmi)
	client.on('connected', onConnectedHandler_tmi)
	client.on('disconnected', onDisconnectedHandler_tmi)

	//connect to Twitch:
	await client.connect()
	await pingDiscord()

	//setTimeout(() => pingMulti(), 900000)
}

async function onMessageHandler_tmi(target, context, msg, self) {
	//console.log(`msg rcvd: ${msg.toLowerCase()}`)
	if (self) { return } //Ignore messages from the bot

	var words = msg.split(/[ ,]+/)
	var output = ""

	/*if (words[0].toLowerCase() == "!multi") { //run appropriate command
		output = "The boi: https://twitch.tv/NeXuS15 :3"
	}
	else*/
	if (words[0].toLowerCase() == "!discord") {
		output = "Come be furry trash with us :3 https://discord.gg/qW2aafm")
    }
	if (output) sendMessage(target, context, output)
}

//Helper function sends messages
function sendMessage(target, context, message) {
	if (context['message-type'] === 'whisper') {
		client.whisper(target, message)
	} else {
		client.say(target, message)
	}
}

async function pingDiscord() {
	client.say("#darizard", "Come be furry trash with us :3 https://discord.gg/qW2aafm")
	setTimeout(pingDiscord, discordInterval)
}

async function pingMulti() {

	client.say("#darizard", "I'm streaming with NeXuS! https://twitch.tv/NeXuS15")
	setTimeout(pingMulti, multiInterval)
}

//When connecting to Twitch chat:
function onConnectedHandler_tmi(addr, port) {
	console.log(`* Connected to ${addr}:${port}`)
}

//When disconnecting from Twitch:
function onDisconnectedHandler_tmi(reason) {
	console.log(`Disconnected: ${reason}`)
	process.exit(1)
}