'use strict';

import { logerrors } from './errors.js';
import { connect as tmiconnect } from './tmiclient.js';
import { connect as pubsubconnect } from './pubsubclient.js';
import { connect as discordconnect } from './discordclient.js';
import { connect as obsconnect } from './obsclient.js';

main()

async function main() {
	logerrors();
	tmiconnect();
	pubsubconnect();
	discordconnect();
	obsconnect();
}