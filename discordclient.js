import { Client , GatewayIntentBits } from 'discord.js';
import { promises as fs } from 'fs';

var client;

export async function connect() {
	const DariBotCreds = JSON.parse(await fs.readFile('./resources/creds/DariBot.json', 'UTF-8'));

	client = new Client({ intents: [GatewayIntentBits.Guilds] });

	client.once('ready', async () => {
		console.log('Discord client ready!');
		setDariMicMute(false);
		/*const Guilds = client.guilds.cache.map(guild => guild.id);

		for (var id of Guilds) {
			var guild = client.guilds.cache.get(id);
			console.log(id);
			const Members = guild.members.cache.map(member => member.id);
			console.log(Members);
		}*/
	});
	client.login(DariBotCreds.discord.token);
}

export async function setDariMicMute(muted) {
	// Hard-code mutes in both servers for now
	var guildMine = await client.guilds.cache.get('590644703888932865');
	var dariMine = await guildMine.members.fetch('235917636892885005');
	var guildMM = await client.guilds.cache.get('830911962211811348');
	var dariMM = await guildMM.members.fetch('235917636892885005');
	if (dariMine.voice.channel) {
		dariMine.voice.setMute(muted);
	}
	if (dariMM.voice.channel) {
		dariMM.voice.setMute(muted);
    }
}