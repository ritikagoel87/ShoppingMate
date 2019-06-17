const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = Mongoose.Schema

// class Vocab < Schema
const ItemSchema = new Schema({
    name: String,
    category: String,
    barcode: Number
  },
  { collection: 'items' } // like the table in ActiveRecord
);

module.exports = mongoose.model('Item', ItemSchema);
