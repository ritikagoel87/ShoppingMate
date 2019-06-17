const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Purchase = mongoose.model('Purchase');

exports.listAllItems = (req, res) => {
  Item.find({}, (err, items) => {
    if ( err ) {
      res.send( err );
    }
    res.json(items);
  });
};

exports.itemsInList = (req, res) => {

  Purchase.find({ list_id: req.params.id }, "item_id", (err, ids) => {
    if ( err ) {
      res.send( err );
    }
    return ids;
  })
  .then( (result) => {
    return result.map( (item) => {
      return Item.findById(item.item_id, (err, itemData) => {
        if (err) {
          res.send(err);
        }
        return itemData;
      });
    });
  })
  .then(async (itemsData) => {
    const executedItemsData = await itemsData.map(async (data) => {
      return await data.lean().exec((err, itemDetails) => {
        if (err) {
          res.send(err);
        }
        console.log("Inside queryExecution", itemDetails);
        return itemDetails;
      });
    });
    console.log("Outside mapping", executedItemsData);
    return res.json(executedItemsData);
  })
  .catch((error) => error);
};

exports.createItem = (req, res) => {
  const newItem = new Item(req.body);
  newItem.save((err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.getItem = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.updateItem = (req, res) => {
  Item.findOneAndUpdate(
    {_id: req.params.id}, // id
    req.body, //new values
    (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    }
  );
};

exports.deleteItem = (req, res) => {
  Item.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Item successfully deleted',
        _id: req.params.id
      });
    }
  );
};
