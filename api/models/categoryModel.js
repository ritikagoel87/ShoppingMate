const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = Mongoose.Schema

// class Vocab < Schema
const CategorySchema = new Schema({
    name:{
      type: String
    }
  },
  { collection: 'categories' } // like the table in ActiveRecord
);

module.exports = mongoose.model('Category', CategorySchema);
