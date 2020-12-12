const Client = require('./src/client');
const clear = require('clear');
const chalk = require('chalk');
const { program } = require('commander');

program
	.version('0.1.0')
	.command('http <port>')
	.action(function (port) {
		clear();
		const client = new Client(parseInt(port))
		client.connect('localhost', 1234, () => {
			console.info(chalk.blue('Connected to bitpipe.\n\n\n\n'))
			console.info('Logs:')
		})
	});

program.parse(process.argv);