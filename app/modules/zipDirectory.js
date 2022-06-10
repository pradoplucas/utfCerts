const fs = require('fs');
const path = require('path');
var archiver = require('archiver');

module.exports = (pathToDir) => {
	var output = fs.createWriteStream(path.join(pathToDir, 'certs.zip'));
	var archive = archiver('zip');

	return new Promise((resolve, reject) => {
		output.on('close', function () {
			console.log('Size: ' + (archive.pointer()/1000) + ' kb');
			resolve({ success: true });
		});

		archive.on('error', function (err) {
			reject({ success: false, err: err });
		});

		archive.pipe(output);

		archive.directory(path.join(pathToDir, 'files'), false);

		archive.directory('subdir/', 'new-subdir');

		archive.finalize();
	});
};
