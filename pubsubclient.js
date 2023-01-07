import { promises as fs } from 'fs';
import { RefreshingAuthProvider } from '@twurple/auth';
import { BasicPubSubClient, PubSubClient } from '@twurple/pubsub';
import { default as robotjs } from 'robotjs';
import { setMic1Mute as setMuteOBS } from './obsclient.js';
import { setDariMicMute as setMuteDiscord } from './discordclient.js';
import { default as player } from 'play-sound';

export async function connect() {
	const darizardCreds = JSON.parse(await fs.readFile('./resources/creds/darizard.json', 'UTF-8'));
	const DariBotCreds = JSON.parse(await fs.readFile('./resources/creds/DariBot.json', 'UTF-8'));
	const rewards = JSON.parse(await fs.readFile('./resources/rewards.json', 'UTF-8'));

	const authProvider = new RefreshingAuthProvider({
		"clientId": DariBotCreds.twurple.clientid,
		"clientSecret": DariBotCreds.twurple.clientsecret,
		onRefresh: async newTokenData => await fs.writeFile('./resources/creds/darizard.json',
			JSON.stringify(newTokenData, null, 4),
			'UTF-8')
	},
		{
			"accessToken": darizardCreds.accessToken,
			"refreshToken": darizardCreds.refreshToken
		}
	);

	const basicclient = new BasicPubSubClient();
	basicclient.onConnect(() => {
		console.log("PubSubClient connected!");
	});

	const client = new PubSubClient(basicclient);

	const userId = await client.registerUserListener(authProvider);
	const listener = await client.onRedemption(userId, async (message) => {
		console.log(`User ${message.userDiplayName} redeemed ${message.rewardTitle}`)
		
		switch (message.rewardId) {
			case (rewards.hornet):
				await HornetReward();
				break;
			case (rewards.miss):
				await MissReward();
				break;
			case (rewards.shush):
				await MuzzleReward();
				break;
			case (rewards.ohno):
				await OhnoReward();
				break;
			case (rewards.twitter):
				break;
			case (rewards.woo):
				break;
        }
	});
}

async function MuzzleReward() {
	player().play('./resources/sounds/DiscordMute.mp3', err => {
		if (err) console.log(`Could not play sound: ${err}`);
	});
	robotjs.keyTap('numpad_0');
	setMuteOBS(true);
	setMuteDiscord(true);

	setTimeout(() => {
		robotjs.keyTap('numpad_0');
		setMuteOBS(false);
		setMuteDiscord(false);
	},
		15000
	);
}

async function HornetReward() {
	player().play('./resources/sounds/hornet_gitgud.mp3', err => {
		if (err) console.log(`Could not play sound: ${err}`);
	});
}

async function MissReward() {

	player({

    }).play('./resources/sounds/mp_miss.mp3', err => {
		if (err) console.log(`Could not play sound: ${err}`);
	});
}

async function OhnoReward() {
	player().play('./resources/sounds/OhNoOhNo-piano.mp3', err => {
		if (err) console.log(`Could not play sound: ${err}`);
	});
}