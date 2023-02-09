//import required modules
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
//Mongo config stuff
//"mongodb://127.0.0.1:27017";
const dbUrl = process.env.ClientID
const client = new MongoClient(dbUrl);

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//convert form data to JSON for easier use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var links = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "/about"
  },
  {
    name: "Order",
    path: "/order"
  }
];

//PAGE ROUTES
app.get("/", async (request, response) => {
  menus = await getList();
  chefs = await getChefList();
  response.render("index", { title: "Home", menu: menus, link: links, chef: chefs });

});
app.get("/about", async (request, response) => {
  menus = await getList();
  response.render("about", { title: "About", menu: menus, link: links });
});

app.get("/order", async (request, response) => {
  menus = await getList();
  response.render("order", { title: "Order", menu: menus, link: links });
});


app.get("/admin/menu", async (request, response) => {
  menus = await getList();
  response.render("menu-list", { title: "Menu links admin", menu: menus, link: links });
});



//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//MONGO FUNCTIONS
/* Function to connect to DB and return the "testdb" database. */
async function connection() {
  await client.connect();
  db = client.db("testdb");
  return db;
}

/* Function to select all documents from menuList. */
async function getList() {
  db = await connection();
  var results = db.collection("menuList").find({});
  list = await results.toArray(); //convert to an array
  return list;
}


/* Function to select all documents from chefList. */
async function getChefList() {
  db = await connection();
  var results = db.collection("chefList").find({});
  list = await results.toArray(); //convert to an array
  return list;
}
