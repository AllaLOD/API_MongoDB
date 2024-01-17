const mongoose = require('mongoose');

const caterorySchema = mongoose.Schema({
    title: { type: String, required: true}
});

module.exports = mongoose.model('Category', caterorySchema);