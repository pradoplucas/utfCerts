const del = require('del');

module.exports = async (dir) => {
	try {
		await del(dir);

		console.log('dir is deleted');
		console.log('##### -- Download Process End\n')
	} catch (err) {
		console.error('Error while deleting ' + dir);
	}
};
