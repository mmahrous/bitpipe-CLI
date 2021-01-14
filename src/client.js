const Net = require('net');
const Proxy = require('./proxy');
const Socket = require('fast-tcp').Socket;
const clear = require('clear');
const chalk = require('chalk');
class Client {
	constructor(port) {
		this._client = null;
		this._proxy = new Proxy(port, this);
		this._id;
	}

	connect(host, port, callback) {
		this._client = new Socket({
			host,
			port
		});
		this.__on(host, port);
		return callback()
	}

	write(ch, data) {
		this._client.emit(ch, data)
	}

	__on(host, port) {
		this._client.on('req', (chunk) => {
			const req = JSON.parse(chunk.toString());
			this._proxy.request(req, this._id);
		});
		this._client.on('ack', (chunk) => {
			const req = JSON.parse(chunk.toString());
			this._id = req.id;
			this._host = req.host;
			clear();
			console.info(chalk.blue('Connected to bitpipe.\n'))
			console.info(`connect to: https://${req.id}.c.bitpipe.app\n`);
			console.info('Logs:')
			this._client.emit('connected', true)
		});
		this._client.on('end', () => {
			console.log('Requested an end to the TCP connection');
		});
	}
}

module.exports = Client