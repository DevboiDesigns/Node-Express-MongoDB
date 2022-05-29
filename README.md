# Node - Express - MongoDB


## Helpful Links
* [URL-Encoder](https://meyerweb.com/eric/tools/dencoder/)


## Helpful Code 

### Set Date to Current date always
* `<%= new Date().getFullYear() %>`

### Email Validation Check
* `npm install validator`

```js
 // Validator NPM logic/method
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must provide a valide email.");
  }
```

### TypeOf

*checks the type of data passed into*

```js
if (typeof this.data.username != "string") {
    this.data.username = "";
  }
```

### Remove white space

```js
// --------------------- .trim = remove white spaces 
username: this.data.username.trim.toLowerCase()
```

# Connection MongoDb

* `npm install mongodb`

**require in package**

* `const {MongoClient} = require('mongodb')`
* `let db`

**in db.js file**

```js
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongoDB connection string"
);

async function start() {
  await client.connect();
  module.exports = client.db();
  const app = require("./app");
  app.listen(3000);
}

start();

```
  
## Enviorment Variables 
* `.env` - create file with name
  
**Add entry**

```
CONNECTIONSTRING=mongodb+srv://<username>:<password>@cluster0.ia7ffaz.mongodb.net/<database>?retryWrites=true&w=majority
```

* `npm install dotenv`

**IN DB file**

```js
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.CONNECTIONSTRING);
```