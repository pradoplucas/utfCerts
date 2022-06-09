const Event = require('../models/Event.model');
const downloadFiles = require('../modules/downloadFiles');

const mountParcial = require('../modules/mountParcial')

const listEvent = {
	init: '<li><a href="javascript:getEventData(\'',
	mid1: '\', \'',
	mid2: '\');"><div class="row"><div class="col-3 col-sm-2">| ',
	mid3: ' |</div><div class="col-9 col-sm-10">',
	final: '</div></div></a></li>'
}

const listCampus = [ 
	'CT', 'AP', 'CM', 'DV', 'FB', 'GP', 'LD', 
	'MD', 'PB', 'PG', 'SH', 'TD', 'CP'
]

module.exports = {
	get: (req, res) => {
		res.render('searchEvent');
	},
	getEventSearch: async (req, res) => {
		let eventLi = '',
			eventName = req.params.eventName
						.toUpperCase()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '');

		let events = 	await Event
						.find({ name_search: { $regex:  eventName } })
						.sort({ year : -1})
						.lean()
		
		for (let oneEvent of events){
			eventLi += 	listEvent.init
						+ oneEvent._id.toString()
						+ listEvent.mid1
						+ oneEvent.name
						+ listEvent.mid2
						+ oneEvent.year
						+ listEvent.mid3
						+ oneEvent.name
						+ listEvent.final
		}

		res.end(eventLi)

	},
	getEventData: async (req, res) => {

		let oneEvent = 	await Event
						.findById(req.params.eventId.toString())
						.lean()

		oneEvent.certs.sort((a, b) => (a.owner > b.owner) ? 1 : -1)

		res.end(JSON.stringify({
			tableBody: mountParcial.createTableEvent(oneEvent.certs), 
			qty: oneEvent.qty_certs, 
			year: oneEvent.year, 
			campus: listCampus[parseInt(oneEvent.campus.code) - 1]
		}));


	},
	getEventDownload: (req, res) => {
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
