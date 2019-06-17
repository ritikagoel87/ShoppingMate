const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = Mongoose.Schema

// class Vocab < Schema
const StoreSchema = new Schema({
    name:{
      type: String
    }
  },
  { collection: 'stores' } // like the table in ActiveRecord
);

module.exports = mongoose.model('Store', StoreSchema);
