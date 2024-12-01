const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        requires: [true, 'amount is required']
    },
    type: {
        type: String,
        requires: [true, 'type is required']
    },
    category: {
        type: String,
        requires: [true, 'category is required']
    },
    refrence: {
        type: String,
        requires: [true, 'refrence is required']
    },
    description: {
        type: String,
        requires: [true, 'description is required']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    },
}, { timestamps: true });

const TransectionModel = mongoose.model('Transection', transectionSchema);

module.exports = TransectionModel;
