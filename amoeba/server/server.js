// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 8080;

// // Database setup
// const DataAccess = require('../database/dao');
// const NodeRepository = require('../database/node_repository');
// const dataAccess = new DataAccess('./database.sqlite3;foreign keys=true;');
// const nodeRepo = new NodeRepository(dataAccess);
// nodeRepo.createTable()
//   .then(() => nodeRepo.getOrCreateRoot());

// // App setup
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log('\nReceived:',{url: req.originalUrl, body: req.body, query: req.query})
//   next();
// });

// // Utility Functions
// const getRoot = () => {
//   return nodeRepo.getRoot();
// };

// const findNode = (id) => {
//   return nodeRepo.getById(id);
// };

// const addNode = (name, parentId) => {
//  return nodeRepo.create(name, parentId);
// };

// const updateNode = (name, id) => {
//   return nodeRepo.update(name, id);
// }

// const deleteNode = (id) => {
//   return nodeRepo.delete(id);
// };

// const getChildNodes = (id) => {
//   return nodeRepo.getChildNodes(id);
// }

// // Routes 
// app.get('/api', (req, res) => {
//   findNode(1).then(node => {
//     res.json(node)
//     // getChildNodes(node.id).then(children => {
//     //   const response = Object.assign({}, node, { children });
//     //   res.json(response)
//     // })
//   })
// });

// app.post('/api/amoeba/:parentId', (req, res) => {
//   const { parentId } = req.params;
//   const { body: { name } } = req;

//   addNode(name, parentId).then(result => {
//     findNode(result.id)
//     .then(node => res.json({ node }))
//     .catch(err => {
//       console.log(err);
//       res.json({ status: 500, err });
//     });
//   }).catch(err => {
//     console.log(err);
//     res.json({ status: 500, err });
//   });
// });

// app.get('/api/amoeba/:id', (req, res) => {
//   // const { params: { id } } = req;
  
//   // findNode(id).then(parent => {
//   //   getChildNodes(parent.id).then(children => {
//   //     const response = Object.assign({}, parent, { children });
//   //     res.json(response)
//   //   })
//   //   .catch(err => {
//   //     console.log(err)
//   //     res.json({ status: 500, err });
//   //   })
//   // })
//   // .catch(err => {
//   //   console.log(err);
//   //   res.json({ staus: 404, err });
//   // });

// });

// app.put('/api/amoeba/:id', (req, res) => {
//   const { params: { id } } = req;
//   const { name } = req.body;

//   updateNode(name, id).then(() => {
//     res.json({ status: 201, message: 'OK' })
//   }).catch(err => {
//     console.log(err);
//     res.json({ status: 500, err });
//   });
// });

// app.delete('/api/amoeba/:id', (req, res) => {
//   // const { params: { id } } = req;
  
//   // deleteNode(id).then(() => {
//   //   res.json({ status: 200, message: 'OK' });
//   // }).catch(err => {
//   //   console.log(err)
//   //   res.json({ status: 500, err });
//   // });
// });


// // click on the + next to a node (the parent node), make POST call to /api/amoeba/:parentId
// // :parentId is the ID of the node you clicked on
// // body -> EvoNode() from front end w/ a name
// // push onto children [] of parent

// app.listen(port, () => console.log(`Listening on port ${port}`));


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

// Database setup
const DataAccess = require('../database/dao');
const NodeRepository = require('../database/node_repository');
const dataAccess = new DataAccess('./database.sqlite3');
const nodeRepo = new NodeRepository(dataAccess);
nodeRepo.createTable()
  .then(() => nodeRepo.getOrCreateRoot());

// App setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('\nReceived:',{url: req.originalUrl, body: req.body, query: req.query})
  next();
});

// Utility Functions
const getRoot = () => {
  return nodeRepo.getOrCreateRoot();
};

const findNode = (id) => {
  return nodeRepo.getById(id);
};

const addNode = (name, parentId) => {
 return nodeRepo.create(name, parentId);
};

const updateNode = (name, id) => {
  return nodeRepo.update(name, id);
}

const deleteNode = (id) => {
  return nodeRepo.delete(id);
};

const getChildNodes = (id) => {
  return nodeRepo.getChildNodes(id);
}

// Routes 
app.get('/api', (req, res) => {
  getRoot().then(root => {
    getChildNodes(root.id).then(children => {
      res.send(Object.assign({}, root, { children }))
    })
  });
});

app.post('/api/amoeba/:parentId', (req, res) => {
  const { parentId } = req.params;
  const { body: { name } } = req;

  addNode(name, parentId).then(result => {
    findNode(result.id)
    .then(node => res.json({ node }))
    .catch(err => {
      console.log(err);
      res.json({ status: 500, err });
    });
  }).catch(err => {
    console.log(err);
    res.json({ status: 500, err });
  });
});

app.get('/api/amoeba/:id', (req, res) => {
  const { params: { id } } = req;
  
  findNode(id).then(parent => {
    getChildNodes(parent.id).then(children => {
      const response = Object.assign({}, parent, { children });
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.json({ status: 500, err });
    })
  })
  .catch(err => {
    console.log(err);
    res.json({ staus: 404, err });
  });

});

app.put('/api/amoeba/:id', (req, res) => {
  const { params: { id } } = req;
  const { name } = req.body;

  updateNode(name, id).then(() => {
    findNode(id).then(node => {
      res.json({ status: 201, message: 'OK', node })
    })
  }).catch(err => {
    console.log(err);
    res.json({ status: 500, err });
  });
});

app.delete('/api/amoeba/:id', (req, res) => {
  const { params: { id } } = req;
  
  deleteNode(id).then(() => {
    res.json({ status: 200, message: 'OK' });
  }).catch(err => {
    console.log(err)
    res.json({ status: 500, err });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));