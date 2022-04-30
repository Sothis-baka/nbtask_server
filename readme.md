# NB task

### Description

A table of contents that can be edit by multiple user.

User can add row / column.

User can resize a row / column.

User are not allowed to edit a cell at the same time.

### Usage

Set urls in config.js on both client & server side code.

A default one is

client/src/config.js

```javascript
const serverUrl = 'http://localhost:4000/';
const wsUrl = "ws://localhost:4000/"

export { serverUrl, wsUrl };
```

server/config.js

```javascript
const DB =
    "mongodb+srv://{username}:{password}@temp.eoqwd.mongodb.net/{Database}?retryWrites=true&w=majority"

module.exports = { DB };
```

You need to replace contents wrapped with {} in url with what you have.

run

```
npm i
npm start
```

in both folder with cmd.

Open localhost:3000 to view the page

### Deployment
