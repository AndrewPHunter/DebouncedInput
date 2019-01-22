var jsf = require("json-schema-faker");
var fs = require("fs");
var chance = require("chance");
var schema = require("./schema");

jsf.extend("faker", () => require("faker"));
jsf.extend("chance", () => new chance());
const json = JSON.stringify(jsf.generate(schema));

fs.writeFile("server/db.json", json, function(err) {
  if (err) {
    return console.log(err);
  } else {
    console.log("Mock data generated.");
  }
});
