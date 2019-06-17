const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Purchase = mongoose.model('Purchase');
const Store = mongoose.model('Store');
const List = mongoose.model('List');

exports.listAllLists = (req, res) => {
  List.find({}, (err, lists) => {
    if ( err ) {
      res.send( err );
    }
    res.json(lists);
  });
};

exports.createList = (req, res) => {
  const newList = new List(req.body);
  newList.save((err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
};

exports.getList = (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
};

exports.getListByOwner = (req, res) => {
  List.find({ owner_id: req.params.id}, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
};

const findItem = (id, store_id) => {
  return new Promise((resolve, reject) => {
    Purchase.find({ list_id: id, targetStore: store_id}, 'item_id', (err, purchase) => {
      if (err) {
        reject(err);
      }
      resolve(purchase);
    });
  });
}

const findList = (item_id) => {
  return new Promise((resolve, reject) => {
    Item.findById( item_id, (err, list) => {
      if (err) {
        reject(err);
      };
      // console.log(list);
      resolve(list);
    });
  })
}

exports.getListByStore = (req, res) => {
  // let results = [];

  findItem( req.params.id, req.params.store_id )
  .then( (lists) => {
    let arr = [];
    lists.forEach( (list) => {
      // console.log(list);
      const findEachItem = findList(list.item_id).then( (item) => {
        // console.log(item);
        // arr.push(item);
        return item;
        // console.log(arr);
      });
      // console.log(findEachItem);
      setTimeout(() => {
        arr.push(findEachItem);
      }, 5000);
      console.log(arr);
    });
    console.log(arr);
  });
};

exports.updateList = (req, res) => {
  List.findOneAndUpdate(
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
  List.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'List successfully deleted',
        _id: req.params.id
      });
    }
  );
};
