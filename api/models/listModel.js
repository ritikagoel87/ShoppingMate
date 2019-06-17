const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = Mongoose.Schema

// class Vocab < Schema
const ListSchema = new Schema({
    name: {
      type: String
    },
    owner_id: {
      type: String,
      required: 'Must specify Owner of the list'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      required: 'Must specify if completed or not',
      default: false
    }
  },
  { collection: 'lists' } // like the table in ActiveRecord
);

const SharedListSchema = new Schema({
    list_id: [{ type: Schema.Types.ObjectId, ref: 'List' }],
    user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { collection: 'sharedLists' } // like the table in ActiveRecord
);

module.exports = mongoose.model('List', ListSchema);
module.exports = mongoose.model('SharedList', SharedListSchema);
