require('dotenv').config();
const liveServer = require("live-server");
 
const params = {
    port: process.env.KEY, 
    host: process.env.IP,
    root: "./web",
    open: false,
    wait: 1000, 
    logLevel: 2, 
    middleware: [function(req, res, next) { next(); }]
};
liveServer.start(params);