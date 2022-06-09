const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String
    },
    name_search: {
        type: String
    },
    code: {
        type: String
    },
    year: {
        type: String
    },
    campus: {
        type: {
            code: {
                type: String
            },
            name: {
                type: String
            }
        }
    },
    certs: {
        type: [{
            code: {
                type: String
            },
            owner: {
                type: String
            }
        }]
    },
    qty_certs: {
        type: Number
    }
})

module.exports = mongoose.model('event', eventSchema);