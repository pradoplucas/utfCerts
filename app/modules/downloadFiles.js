const downloadFromSGCE = require('./downloadFromSGCE');

const zipDirectory = require('./zipDirectory');
const path = require('path');
const fs = require('fs');
const deleteDir = require('./deleteDir');

module.exports = async (userId, arrayCodes, user_id = '') => {
	const 	pathToDir = path.join(process.cwd(), 'uploads', 'temp', userId),
			pathToDirFiles = path.join(pathToDir, 'files'),
			pathToDirFilesMyCerts = path.join(pathToDirFiles, 'myCerts')

	if (fs.existsSync(pathToDir)) {
		deleteDir(pathToDir);
	}

	try {
		fs.mkdirSync(pathToDir, { recursive: true });
		fs.mkdirSync(pathToDirFiles, { recursive: true });
		fs.mkdirSync(pathToDirFilesMyCerts, {
			recursive: true,
		});
	} catch (err) {
		console.log('Err CreateDir: ' + err);
	}

	try {

		console.log('##### -- Download Process Start')
		
		await downloadFromSGCE(
			arrayCodes,
			pathToDirFilesMyCerts
		);

		await zipDirectory(pathToDir);
	} catch (err) {
		console.log('Erro: ' + err);
	}
};
