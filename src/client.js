const Net = require('net');
const Proxy = require('./proxy');

class Client {
	constructor(port) {
		this._client = new Net.Socket();
		this._proxy = new Proxy(port, this);
		this._id;
	}

	connect(host, port, callback) {
		this.__on(host, port);
		this._client.connect({ host, port }, callback);
	}

	write(ch, data) {
		// setTimeout(() => this._client.write('CH'+ch));
		// setTimeout(() => );
		this._client.write(data)
	}

	__on(host, port) {
		this._client.on('data', (chunk) => {
			const req = JSON.parse(chunk.toString());
			if ('ack' in req) {
				this._id = req.id;
				console.info(`connect to: http://${req.id}.${host}:3000`);
			} else {
				this._proxy.request(req, this._id);
			}
		});
		this._client.on('end', () => {
			console.log('Requested an end to the TCP connection');
		});
	}
}

module.exports = Client