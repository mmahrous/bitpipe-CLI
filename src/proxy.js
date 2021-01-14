const http = require("http");

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
					res.on("data", d => {
						this._client.write(req.id, d)
					})
					res.on("end", () => {
						this.__logger(req)
						setTimeout(() => this._client.write(req.id, "EOR"));
					})
				})
			.end()
	}



	__logger(req) {
		console.info(new Date(), req.method, req.url, req.headers['user-agent'])
	}


	_compres(data) {
		return data
		// return zlib.deflateSync(data, 'utf8').toString('base64')
	}
}

module.exports = Proxy