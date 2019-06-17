const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = Mongoose.Schema

// class Vocab < Schema
const PurchaseSchema = new Schema({
    list_id: String,
    item_id: String,
    quantity: String,
    status: { type: Boolean, default: false },
    price: Number,
    targetStore: String,
    actualStore: String,
    buyer: String,
    purchaseDate: { type: Date, default: Date.now }
  },
  { collection: 'purchases' } // like the table in ActiveRecord
);

module.exports = mongoose.model('Purchase', PurchaseSchema);
