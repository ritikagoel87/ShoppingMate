const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');

exports.listAllPurchases = (req, res) => {
  Purchase.find({}, (err, purchases) => {
    if ( err ) {
      res.send( err );
    }
    res.json(purchases);
  });
};

exports.createPurchase = (req, res) => {
  const newPurchase = new Purchase(req.body);
  newPurchase.save((err, purchase) => {
    if (err) {
      res.send(err);
    }
    res.json(purchase);
  });
};

exports.getPurchase = (req, res) => {
  Purchase.findById(req.params.id, (err, purchase) => {
    if (err) {
      res.send(err);
    }
    res.json(purchase);
  });
};

exports.updatePurchase = (req, res) => {
  Purchase.findOneAndUpdate(
    {_id: req.params.id}, // id
    req.body, //new values
    (err, purchase) => {
      if (err) {
        res.send(err);
      }
      res.json(purchase);
    }
  );
};

exports.deletePurchase = (req, res) => {
  Purchase.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Purchase successfully deleted',
        _id: req.params.id
      });
    }
  );
};
