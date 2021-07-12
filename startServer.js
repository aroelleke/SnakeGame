var liveServer = require("live-server")

var params = {
    port: 8180,
    host: "0.0.0.0",
    open: true,
    file: "index.html",
    wait: 1000,
    logLevel: 2,
}

liveServer.start(params)