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

# Connecting MongoDb

* `npm install mongodb`
* `npm install connect-mongo` - to store cookies in database - session

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
  
# Enviorment Variables 
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

# Promises 

* Syntax for writing a promise - similar to RESULT type in swift

```js
User.prototype.login = function () {
  // return new Promise()
  return new Promise((resolve, reject) => {
    this.cleanUp();
    // MongoDB method to find one entry
    userCollection.findOne(
      { username: this.data.username },
      (err, attemptedUser) => {
        if (attemptedUser && attemptedUser.password == this.data.password) {
          resolve("Congrats!");
        } else {
          reject("Invalid username/ password");
        }
      }
    );
  });
};
```


* Syntax for working with a Promise 

*init*

```js
user.login().then().catch();
```

*usage*

```js
exports.login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};
```

## Example code on Promises

```js
eatBreakfast()
  .then(() => eatLunch())
  .then(() => eatDinner())
  .then(() => eatDessert())
  .catch((error) => {
  console.log(error)
})


// Do NOT modify below this line until instructed to do so.
function eatBreakfast() {
  return new Promise(function(resolve, reject) {
    console.log("The eatBreakfast function started executing.")
    setTimeout(function() {
      addText("You just ate breakfast.")
      resolve()
    }, 800)
  })
}

function eatLunch() {
  return new Promise(function(resolve, reject) {
    console.log("The eatLunch function started executing.")
    setTimeout(function() {
      addText("You just ate lunch.")
      resolve()
    }, 300)
  })
}

function eatDinner() {
  return new Promise(function(resolve, reject) {
    console.log("The eatDinner function started executing.")
    setTimeout(function() {
      addText("You just ate dinner.")
      resolve()
    }, 600)
  })
}

function eatDessert() {
  return new Promise(function(resolve, reject) {
    console.log("The eatDessert function started executing.")
    setTimeout(function() {
      addText("You just ate dessert.")
      resolve()
    }, 40)
  })
}
```

# Async/ Await

### Example Async/ Await Code

```js
async function start() {
  try {
    await eatBreakfast()
    await eatLunch()
    await eatDinner()
    await eatDessert()
  } catch (error) {
    console.log(error)
  }
}

start()


// Do NOT modify below this line until instructed to do so.
function eatBreakfast() {
  return new Promise(function(resolve, reject) {
    console.log("The eatBreakfast function started executing.")
    setTimeout(function() {
      addText("You just ate breakfast.")
      resolve()
    }, 800)
  })
}

function eatLunch() {
  return new Promise(function(resolve, reject) {
    console.log("The eatLunch function started executing.")
    setTimeout(function() {
      addText("You just ate lunch.")
      resolve()
    }, 300)
  })
}

function eatDinner() {
  return new Promise(function(resolve, reject) {
    console.log("The eatDinner function started executing.")
    setTimeout(function() {
      addText("You just ate dinner.")
      resolve()
    }, 600)
  })
}

function eatDessert() {
  return new Promise(function(resolve, reject) {
    console.log("The eatDessert function started executing.")
    setTimeout(function() {
      addText("You just ate dessert.")
      resolve()
    }, 40)
  })
}
```

*When the order the methods return in dont matter, can use this syntax*

```js
async function() {
  await Promise.all([promise1, promise2, promise3, promise4])
  // JavaScript will wait until ALL of the promises have completed
  console.log("All promises completed. Do something interesting now.")
}
```

# Hashing Passwords 

* `npm install bcryptjs`

*usage for init hashing*

```js
const bcrypt = require("bcryptjs");

// Hash User Password  - Salt & Hash
    let salt = bcrypt.genSaltSync(10);
    this.data.password = bcrypt.hashSync(this.data.password, salt);
    userCollection.insertOne(this.data);
```

*usage for decoding hash*

```js
if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) 
```


# Sessions
* `npm install express-session`

**Config**

```js
const session = require("express-session");


// Sessions
let sessionOptions = session({
  secret: "asdfljkadflkjlkjasdkdd",
  // Store cookies in database 
  store: MongoStore.create({ client: require("./db") }),
  // Boiler
  resave: false,
  saveUninitialized: false,
  // miliseconds to one Day/ 24hrs
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});

app.use(sessionOptions)
```

*usage for capturing setting session*

* stores the object in session memory
* creates a cookie in web browser 

```js
.login()
    .then((result) => {
      // set session on req - add prop "user" - set prop for new prop "user" - will only run when Login is run
      req.session.user = { favColor: "blue", username: user.data.username };
      res.send(result);
    })
```

*usage for checking if session excist*

```js
// if user excists on session then they have signed in
  if (req.session.user) {
    res.send("Welceome to the actual application!");
  } else {
    res.render("home-guest");
  }
```


# Tokens



# Injecting/ Extracting Data 

* `<%= username %>` - expose properties 

```js
res.render("home-dashboard", { username: req.session.user.username });
```

*extracting or using*

* in ejs/ html file 

```js
<h2>Hello <strong><%= username %></strong>, your feed is empty.</h2>
```