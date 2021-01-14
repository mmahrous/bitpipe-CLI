const { exec } = require("child_process");
const { version, name } = require('./package.json');
const filename = `${name}_v${version}`;

exec(`pkg index.js --output ./bin/v${version}/${filename}_mac_x64 --targets node14-macos-x64 --public`, (error, stdout, stderr) => {
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

exec(`pkg index.js --output ./bin/v${version}/${filename}_linux_x64 --targets node14-linux-x64 --public`, (error, stdout, stderr) => {
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

exec(`pkg index.js --output ./bin/v${version}/${filename}_win_x64 --targets node14-win-x64 --public`, (error, stdout, stderr) => {
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