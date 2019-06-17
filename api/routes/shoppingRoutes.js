const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const storeController = require('../controllers/storeController');
const itemController = require('../controllers/itemController');
const purchasesController = require('../controllers/purchasesController');
const categoryController = require('../controllers/categoryController');
const sharedListController = require('../controllers/sharedListController');

// Magic here
module.exports = (app) => {
  app
    .route('/users')
    .get(userController.listAllUsers)
    .post(userController.createUser);
  app
    .route('/user/login/:email/:password')
    .get(userController.checkLogin);
  app
    .route('/users/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
  app
    .route('/shopping-lists')
    .get(listController.listAllLists)
    .post(listController.createList);
  app
    .route('/shopping-lists/owner/:id')
    .get(listController.getListByOwner);
  app
    .route('/shopping-lists/:id')
    .get(listController.getList)
    .put(listController.updateList)
    .delete(listController.deleteList);
  app
    .route('/shopping-lists/:id/store/:store_id')
    .get(listController.getListByStore);
  app
    .route('/shared-lists')
    .get(sharedListController.listAllLists)
    .post(sharedListController.createList);
  app
    .route('/shared-lists/:id')
    .get(sharedListController.getList)
    .put(sharedListController.updateList)
    .delete(sharedListController.deleteList);
  app
    .route('/stores')
    .get(storeController.listAllStores)
    .post(storeController.createStore);
  app
    .route('/stores/:id')
    .get(storeController.getStore)
    .put(storeController.updateStore)
    .delete(storeController.deleteStore);
  app
    .route('/items')
    .get(itemController.listAllItems)
    .post(itemController.createItem);
  app
    .route('/items/list/:id')
    .get(itemController.itemsInList);
  app
    .route('/items/:id')
    .get(itemController.getItem)
    .put(itemController.updateItem)
    .delete(itemController.deleteItem);
  app
    .route('/purchases')
    .get(purchasesController.listAllPurchases)
    .post(purchasesController.createPurchase);
  app
    .route('/purchases/:id')
    .get(purchasesController.getPurchase)
    .put(purchasesController.updatePurchase)
    .delete(purchasesController.deletePurchase);
  app
    .route('/categories')
    .get(categoryController.listAllCategories)
    .post(categoryController.createCategory);
  app
    .route('/categories/:id')
    .get(categoryController.getCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);
};
