const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.listAllStores = (req, res) => {
  Store.find({}, (err, stores) => {
    if ( err ) {
      res.send( err );
    }
    res.json(stores);
  });
};

exports.createStore = (req, res) => {
  const newStore = new Store(req.body);
  newStore.save((err, store) => {
    if (err) {
      res.send(err);
    }
    res.json(store);
  });
};

exports.getStore = (req, res) => {
  Store.findById(req.params.id, (err, store) => {
    if (err) {
      res.send(err);
    }
    res.json(store);
  });
};

exports.updateStore = (req, res) => {
  Store.findOneAndUpdate(
    {_id: req.params.id}, // id
    req.body, //new values
    (err, store) => {
      if (err) {
        res.send(err);
      }
      res.json(store);
    }
  );
};

exports.deleteStore = (req, res) => {
  Store.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Store successfully deleted',
        _id: req.params.id
      });
    }
  );
};
