var opn = require("opn");
var chromeName = process.platform.match(/^win/) ? "chrome" : "google chrome"; 
opn("http://localhost:9191", { "app" : chromeName });