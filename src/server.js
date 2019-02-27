// Requires
const http = require("http") // Basic server functionality
const colors = require("colors") // Pretty colors
const ora = require("ora") // Spinning thingy
const Router = require("./router") // Router
const url = require("url") // URI parsing and etc.
const fs = require("fs") // Filesystem
const path = require("path") // Path parsing
const cache = require("memory-cache")


function Server(options) {
    // Master server class

    var progressSpinner = ora({ text: "Starting..." }).start()
    this.options = options
    this.options.ip = (typeof this.options.ip !== "undefined") ? this.options.ip : "127.0.0.1" // options.ip: defaults to 127.0.0.1 (aka localhost)
    this.options.port = (typeof this.options.port !== "undefined") ? this.options.port : "80" // options.port: defaults to port 80 (aka HTTP defualt port)
    this.options.autoRoute = (typeof this.options.autoRoute !== "undefined") ? this.options.autoRoute : true // options.autoRoute: defualts to true (will auto-respond to get requests)
    this.options.xPoweredBy = (typeof this.options.xPoweredBy !== "undefined") ? this.options.xPoweredBy : true // options.xPoweredBy: defaults to true (will enable/disable the X-Powered-By header)
    this.options.customErrorPages = (typeof this.options.customErrorPages !== "undefined") ? path.normalize(this.options.customErrorPages) : false // options.customErrorPages: displays custom error pages (ie. 404) from root directory; defualts to false
    this.options.pagesDirectory = path.normalize((typeof this.options.pagesDirectory !== "undefined") ? this.options.pagesDirectory : __dirname.slice(0, -4) + "/pages") // options.pagesDirectory: working directory (aka root) for pages; defaults to "../pages/"
    this.options.favicon = (typeof this.options.favicon !== "undefined") ? path.normalize(this.options.favicon) : null // options.favicon: custom favicon; default is null (no favicon)
    this.options.debug = (typeof this.options.debug !== "undefined") ? this.options.debug : false // options.debug: shows debug info; default is false (no messages)
    

    this.server = http.createServer((req, res) => { // Sets up http server with listener attached
        req.on('error', (err) => { // Error handler
            //throw new Error(err)
        })

        if (req.url === "/favicon.ico" && req.method === "GET") {
            if (this.options.favicon !== null) {
                res.writeHead(200)
                try {
                    res.write(fs.readFileSync(this.options.pagesDirectory + this.options.favicon))
                } catch (err) {
                    throw new Error("Object is not a valid resolvable file or path")
                }
            } else {
                res.writeHead(204) // No content... will change if favicon is provided via SettingsServiceWorker
            }
            res.end()
            return
        }
        if (this.options.debug) console.log(colors.gray("[REQ] " + req.method + " was made upon " + req.url))
        if (this.options.autoRoute == true) {
            Router(req, res, req.url, 200, options)
        }
    }).listen(this.options.port) // Listener on custom port (TODO: custom IP)

    setTimeout(() => { // Logs success to console
        progressSpinner.succeed("Server initalized".green)
        console.log(colors.green("Listening to http://" + this.options.ip + ":" + this.options.port + ""))
        console.log("\n")
    }, 1000)

    // If ^C occours, it closes the server securely
    if (process.platform == 'win32') require('readline').createInterface({ input: process.stdin, output: process.stdout }).on('SIGINT', () => { process.emit('SIGINT') }) // Emits Terminal Exiting

    process.on("SIGTERM", () => {
        try { this.server.close(() => { null }) } catch (e) { }
        console.log('Sever offline'.red)
        process.exit()
    })

    process.on("SIGINT", () => {
        try { this.server.close(() => { null }) } catch (e) { }
        console.log('Server offline'.red)
        process.exit()
    })

    /* process.on('uncaughtException', () => {
        console.log("\nAn internal error has occoured and the server must close".red)
        try{this.server.close(()=>{null})} catch (e) {}
        console.log(colors.yellow("Server successfully closed"))
        console.log('Sever offline'.red)
        process.exit() // Exiting
    }) */
}

// -- PROTOTYPES -- //
/*
Server.prototype.stopServer = function stopServer() { // API : stops the server with a closing message and process exiting.
    this.server.close(()=>{null}) // Why... just why
    console.log(colors.yellow("Server successfully closed"))
    console.log('Sever offline'.red)
    process.exit() // Exiting
}

Server.prototype.isListening = function isListening() {
    return this.server.listening
}

Server.prototype.restart = function restart(n) { // API : stops the server and then initalizes it again n seconds later
    var progressSpinner = ora({text:"Restarting..."}).start()
    this.server.close(()=>{null}) // Why... just why
    
    this.server = null

    setTimeout((n)=>{
        this.server = http.createServer(function(req, res){ // Sets up http server with listener attached
            res.writeHead(200, {"Content-Type":"text/plain"}) 
            res.write("Hello, World!")
            res.end()
        }).listen(this.port) // Listener on custom port (TODO: custom IP)
        setTimeout(() => { // Logs success to console
            progressSpinner.succeed("Server restart successful".green)
            console.log(colors.green("Listening to http://" + this.ip + ":" + this.port + ""))
            console.log("")
        }, 1000)
    }, n)
}

Server.prototype.restartInterval = function restartInterval(n) { // API : stops the server and then initalizes it again ever n seconds
    var progressSpinner = ora({text:"Restarting..."}).start()
    this.server.close(()=>{null}) // Why... just why
    
    this.server = null

    setInterval((n)=>{
        this.server = http.createServer(function(req, res){ // Sets up http server with listener attached
            res.writeHead(200, {"Content-Type":"text/plain"}) 
            res.write("Hello, World!")
            res.end()
        }).listen(this.port) // Listener on custom port (TODO: custom IP)
        setTimeout(() => { // Logs success to console
            progressSpinner.succeed("Server restart successful".green)
            console.log(colors.green("Listening to http://" + this.ip + ":" + this.port + ""))
            console.log("")
        }, 1000)
    }, n)
}
*/
module.exports = Server