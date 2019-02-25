
# Setup Instructions
1. Pull repository
2. npm install
3. Open 2 terminal tabs
3a. 'npm start' to start the front end application
3b. 'npm run api-server' to start the database

## Overview: Back-end
I kept the backend fairly basic, as my main concern was making sure the front-end was rendering properly and all of the actions were working as expected. 

I used a sqlite database, and the main point of interest is the Node table. It only has an id, name, and parentId. The way that I keep track of child nodes is through this parent id. Node is a self referncing table - parent id is a foreign key to id, which is the primary key. Child nodes will always have a parent id associated with them so it's simple to query all of a given node's children. 

Furthermore, making it the foreign key allows me to use ON DELETE CASCADE; this recursively deletes all children of a given parent. There's a simplistic data access file that wraps the sqlite API in promises, and the server's API routes are also kept straightforward due to time constraints. Given more time, I'd like to have come up with a more layered approach and handled promises/asynchronous calls more neatly (with proper error handling).

## Overview: Front-end
I built this front end application using create-react-app. State management is handled through redux, API requests through axios, and asynchronous actions/action creators through redux-thunk. The state is kept small - 1 object for the tree of nodes, and 1 object for the modal. The application is styled in vanilla CSS using the BEM naming convention, with 4 main reusable components - Buton, Input, Modal, and Node. 

My main intent was to create a <Node /> component that could recursively render itself plus any potential children. Each node has 4 calls-to-action: Opening in a new tab (top left icon), deleting (top right icon), editing (clicking the name), and adding a child node (clicking plus sign). The inline edits of names is kept in the internal state of the node whilst any action that requires API integration is passed through props and the connect() function of react-redux. The UI is minimalist and given more time, I would have liked to find a better way of laying out some of the actions; however, all of the functionality should be clear and straightforward to use.

I really enjoyed the freedom given to me on this assignment. Please let me know if you have any issues with setup/running it.
Thank you,
PK Kakleas
