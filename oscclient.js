import { Client , Bundle } from 'node-osc';

const client = new Client('10.0.0.73', 39539);

export function sendtest() {
	//use setTimeout for testing this
	const bundle = new Bundle(['/VMC/Ext/Blend/Val', "Muzzle", 0.0], ['/VMC/Ext/Blend/Apply']);
	for (var i = 0; i < 300; i++) {
		client.send(bundle);
	}
}