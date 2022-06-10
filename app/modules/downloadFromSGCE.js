const fs = require('fs');
const path = require('path');
const http = require('http');

module.exports = (arrayCodes, pathToDir) => {
	const urlBase = 'http://apl.utfpr.edu.br/extensao/emitir/';

	return new Promise((resolve, reject) => {
		let count = 0;
		let arraySize = arrayCodes.length;
		
		arrayCodes.forEach((oneCode) => {
			http.get(urlBase + oneCode, (res) => {
				const fileStream = fs.createWriteStream(
					path.join(pathToDir, oneCode + '.pdf')
				);
	
				res.pipe(fileStream);
	
				fileStream.on('finish', () => {
					fileStream.close();
					count++;
					if (count == arraySize) {
						console.log('FS Done');
						resolve({ success: true });
					}
				});
	
				fileStream.on('error', (err) => {
					fileStream.close();
					console.log('Error: ' + err);
					reject({ success: false, err: err });
				});
			});
		});
	});
};
