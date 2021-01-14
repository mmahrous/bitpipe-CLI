const Client = require('./src/client');
const clear = require('clear');
const { program } = require('commander');

program
	.version('0.1.0')
	.command('http <port>')
	.action(function (port) {
		clear();
		const client = new Client(parseInt(port))
		client.connect('tcp.bitpipe.app', 3000, () => {
			console.info('Connecting.....')
		})
	});

program.parse(process.argv);