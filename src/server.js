// Requires
const http = require("http") // Basic server functionality
const colors = require("colors") // Pretty colors
const ora = require("ora") // Spinning thingy
const Router = require("./router") // Router
const Options = require("./options") // Options Handler

let that

function Server(options) {
    // Master server class
    that = this // Some bs to access variables in prototypes

    var progressSpinner = ora({ text: "Starting..." }).start()
    this.options = Options(options)

    this.server = http.createServer((req, res) => { // Sets up http server with listener attached
        req.on('error', (err) => { // Error handler
            //throw new Error(err)
        })

        if (this.options.debug) console.log(colors.gray("[REQ] " + req.method + " was made upon " + req.url))
        if (this.options.autoRoute == true) {
            Router(req, res, req.url, 200, this.options)
        }
    }).listen(process.env.PORT || this.options.port)

    setTimeout(() => { // Logs success to console
        progressSpinner.succeed("Server initalized".green)
        console.log(colors.green("Listening to http://" + this.options.ip + ":" + this.options.port + ""))
        console.log("\n")
    }, 1000)

    // If ^C occours, it closes the server securely
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

Server.prototype.stopServer = function stopServer() { // API : stops the server with a closing message and process exiting.
    that.server.close(()=>{null}) // Why... just why
    console.log(colors.yellow("Server successfully closed"))
    console.log('Sever offline'.red)
    process.exit() // Exiting
}

Server.prototype.isListening = function isListening() {
    return that.server.listening
}

Server.prototype.restart = function restart(n) { // API : stops the server and then initalizes it again n seconds later
    var progressSpinner = ora({text:"Restarting..."}).start()
    that.server.close(()=>{null})
    
    that.server = null

    setTimeout((n)=>{
        that.server = http.createServer((req, res) => { // Sets up http server with listener attached
            req.on('error', (err) => { // Error handler
                //throw new Error(err)
            })
    
            if (that.options.debug) console.log(colors.gray("[REQ] " + req.method + " was made upon " + req.url))
            if (that.options.autoRoute == true) {
                Router(req, res, req.url, 200, options)
            }
        }).listen(process.env.PORT || that.options.port)

        setTimeout(() => { // Logs success to console
            progressSpinner.succeed("Server restart successful".green)
            console.log(colors.green("Listening to http://" + that.options.ip + ":" + that.options.port + ""))
            console.log("")
        }, 1000)
    }, n)
}

Server.prototype.restartInterval = function restartInterval(n) { // API : stops the server and then initalizes it again ever n seconds
    setInterval((n)=>{
        var progressSpinner = ora({text:"Restarting..."}).start()
        that.server.close(()=>{null}) // Why... just why
    
        that.server = null

    
        that.server = http.createServer((req, res) => { // Sets up http server with listener attached
            req.on('error', (err) => { // Error handler
                //throw new Error(err)
            })
    
            if (that.options.debug) console.log(colors.gray("[REQ] " + req.method + " was made upon " + req.url))
            if (that.options.autoRoute == true) {
                Router(req, res, req.url, 200, options)
            }
        }).listen(process.env.PORT || that.options.port)

        setTimeout(() => { // Logs success to console
            progressSpinner.succeed("Server restart successful".green)
            console.log(colors.green("Listening to http://" + that.options.ip + ":" + that.options.port + ""))
            console.log("")
        }, 1000)
    }, n)
}

module.exports = Server