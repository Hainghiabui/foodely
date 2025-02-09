const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    value: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
