const { exec } = require("child_process");
const { version } = require('./package.json');

exec(`pkg index.js --out-path build/v${version} --public`, (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
});