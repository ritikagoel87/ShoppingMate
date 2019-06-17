const mongoose = require('mongoose');
const List = mongoose.model('List');
const SharedList = mongoose.model('SharedList');

exports.listAllLists = (req, res) => {
  SharedList.find({ user_id: req.params.id }, (err, lists) => {
    if ( err ) {
      res.send( err );
    }
    res.json(lists);
  });
};

exports.createList = (req, res) => {
  const newSharedList = new SharedList(req.body);
  newSharedList.save((err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
};

exports.getList = (req, res) => {
  SharedList.findById(req.params.id, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
};

exports.getListsSharedWithUser = (req, res) => {
  SharedList.
  find({ list_id: req.params.id }).
  populate('user_id').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.user.fname);
    // prints "The author is Ian Fleming"
  });
};

exports.updateList = (req, res) => {
  SharedList.findOneAndUpdate(
    {_id: req.params.id}, // id
    req.body, //new values
    (err, list) => {
      if (err) {
        res.send(err);
      }
      res.json(list);
    }
  );
};

exports.deleteList = (req, res) => {
  SharedList.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'SharedList successfully deleted',
        _id: req.params.id
      });
    }
  );
};
