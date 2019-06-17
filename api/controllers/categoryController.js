const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.listAllCategories = (req, res) => {
  Category.find({}, (err, categories) => {
    if ( err ) {
      res.send( err );
    }
    res.json(categories);
  });
};

exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((err, category) => {
    if (err) {
      res.send(err);
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  Category.findById(req.params.id, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.json(category);
  });
};

exports.updateCategory = (req, res) => {
  Category.findOneAndUpdate(
    {_id: req.params.id}, // id
    req.body, //new values
    (err, category) => {
      if (err) {
        res.send(err);
      }
      res.json(category);
    }
  );
};

exports.deleteCategory = (req, res) => {
  Category.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Category successfully deleted',
        _id: req.params.id
      });
    }
  );
};
