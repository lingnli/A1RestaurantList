//include express module
const express = require("express");
const app = express();
const port = 3000;
const restaurant = require("./restaurant.json");

//include express-handlebars module
const exphbs = require("express-handlebars");

//setup exphbs
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setup static file
app.use(express.static("public"));

//homepage
app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurant.results });
});

//search output
app.get("/search", (req, res) => {
  console.log(req.query.keyword);
  let searchItem = restaurant.results.filter(item =>
    item.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  );
  res.render("index", { restaurant: searchItem, keyword: req.query.keyword });
});

//details page
app.get("/restaurants/:id", (req, res) => {
  console.log(req.params.id);

  let restauransDretail = restaurant.results.filter(
    item => item.id == req.params.id
  );
  console.log(restauransDretail);

  res.render("details", { detail: restauransDretail[0] });
});

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
