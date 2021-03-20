const app = require("./app");
const mongoose = require("mongoose");
const http = require('http');

app.set('port', 3000);
const server = http.createServer(app);
server.listen(3000);
/*app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Succesfuly connected");
});*/