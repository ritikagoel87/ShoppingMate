const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.User = require('./api/models/userModel');
global.List = require('./api/models/listModel');
global.Store = require('./api/models/storeModel');
global.Item = require('./api/models/itemModel');
global.Purchase = require('./api/models/purchasesModel');
global.Category = require('./api/models/categoryModel');
global.SharedList = require('./api/models/listModel');

const routes = require('./api/routes/shoppingRoutes');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  `mongodb+srv://${process.env.DBUNAME}:${process.env.DBPASS}@shopping-mate-lrhd8.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

const PORT = process.env.PORT || 8080; // Future proof for deployment
process.setMaxListeners(0);

const server = express();

// Middleware
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

routes(server);

// start listening
server.listen(PORT);

// We do not need a home page for this app as it is just going to return json response
// server.get('/', (req, res) => {
//   res.send('Yes, This thing is on');
// });

// configure everything in express
server.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found`});
});

console.log(`Server started on http://localhost:${PORT}/`);
