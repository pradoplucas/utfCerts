const Owner = require('../models/Owner.model');
const downloadFiles = require('../modules/downloadFiles');

const mountParcial = require('../modules/mountParcial')

const listOwner = {
	init: '<li><a href="javascript:getOwnerData(\'',
	mid1: '\', \'',
	mid2: '\');">',
	final: '</a></li>'
}

module.exports = {
	get: (req, res) => {
		res.render('searchOwner');
	},
	getOwnerSearch: async (req, res) => {
		let ownerLi = '',
			ownerName = req.params.ownerName
						.toUpperCase()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '');

		let owners = 	await Owner
						.find({ name: { $regex: ownerName } })
						.sort({ name : 1})
						.lean()
		
		for (let oneOwner of owners){
			ownerLi += 	listOwner.init 
						+ oneOwner._id.toString() 
						+ listOwner.mid1 
						+ oneOwner.name 
						+ listOwner.mid2 
						+ oneOwner.name 
						+ listOwner.final
		}

		res.end(ownerLi)

	},
	getOwnerData: async (req, res) => {
		let oneOwner = 	await Owner
						.findById(req.params.ownerId.toString())
						.lean()

		oneOwner.certs.sort((a, b) => (a.year < b.year) ? 1 : -1)

		let selectYear = 	'<option value="all" selected>Todos (' 
							+ oneOwner.certs.length 
							+ ')</option>'

		selectYear += [...new Set(oneOwner.certs.map(item => 
				'<option value="' 
				+ item.year 
				+ '">' 
				+ item.year 
				+ '</option>'
		))].reduce((accum, item) => accum+=item);

		res.end(JSON.stringify({
			tableBody: mountParcial.createTableOwner(oneOwner.certs), 
			selectYear
		}));

	},
	getOwnerDownload: (req, res) => {
		let arrayCodes = JSON.parse(req.params.arrayCodes);

		let userId = 	'user_' 
						+ (Math.floor(Math.random() * 10000) + 1) 
						+ Date.now();

		downloadFiles(userId, arrayCodes).then(() => {
			res.end(userId.toString());
		})
		.catch((err) => {
			console.log('Err: ' + err);
		});
	},
};
