let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

//Team Schema
let teamSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId
    },
    teamName: {
        type: String
    },
    league_id: {
        type: ObjectId
    }

});
mongoose.model('Team', teamSchema);