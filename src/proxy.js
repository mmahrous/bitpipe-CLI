const { throws } = require("assert");
const http = require("http");
const zlib = require('zlib');

class Proxy {
	constructor(port, client) {
		this._port = port;
		this._client = client;
	}
	request(req, socketId) {
		http
			.request({
				hostname: 'localhost',
				port: this._port,
				path: req.url,
				method: req.method,
				headers: req.headers
			},
				res => {
					let body = ""
					res.on("data", d => {
						body += d
					})
					res.on("end", () => {
						const data = this._compres({
							statusCode: res.statusCode,
							headers: { ...res.headers, 'socket-id': socketId},
							body: body
						})
						this.__logger(req)
						this._client.write(data);
					})
				})
			.end()
	}



	__logger(res) {
		console.info(new Date(), res.method, res.url, res.headers.agent)
	}


	_compres(data) {
		return zlib.deflateSync(Buffer.from(JSON.stringify(data)), 'utf8').toString('base64')
	}
}

module.exports = Proxy