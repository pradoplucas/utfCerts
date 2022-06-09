const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownerSchema = new Schema({
    name: {
        type: String
    },
    certs: {
        type: [{
            code: {
                type: String
            },
            year: {
                type: String
            },
            event_code: {
                type: String
            },
            event_name: {
                type: String
            }
        }]
    }
})

module.exports = mongoose.model('owner', ownerSchema);
