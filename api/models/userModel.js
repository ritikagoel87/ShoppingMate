const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = Mongoose.Schema

// class Vocab < Schema
const UserSchema = new Schema({
    fname:{
      type: String,
      required: 'First name cannot be blank'
    },
    lname: {
      type: String
    },
    email: {
      type: String,
      required: 'Email cannot be blank'
    },
    password: {
      type: String,
      required: 'Password cannot be blank'
    }
  },
  { collection: 'users' } // like the table in ActiveRecord
);

module.exports = mongoose.model('User', UserSchema);
