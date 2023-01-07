import { promises as fs } from 'fs';
import OBSWebSocket from 'obs-websocket-js';

export const obs = new OBSWebSocket();

export async function connect() {
    const obsCreds = JSON.parse(await fs.readFile('./resources/creds/obs.json', 'UTF-8'));

    obs.on('ConnectionOpened', () => {
        console.log('OBS Connection opened.');
    });

    obs.on('InputMuteStateChanged', (data) => {
        console.log(`inputName: ${data.inputName}, inputMuted: ${data.inputMuted}`);
    });

    await obs.connect("ws://10.0.0.73:4455", obsCreds.password);
    setMic1Mute(false);
}

export async function setMic1Mute(muted) {
    const data = await obs.call('GetSpecialInputs');
    await obs.call('SetInputMute', { inputName: data.mic1, inputMuted: muted });
}