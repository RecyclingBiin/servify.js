// Requires
const HttpServer = require("./server") // Requires the server sub-module
const EventEmitter = require('events').EventEmitter // For broadcasting GET and POST requests to the parent process
const Router = require("./router") // Router
const colors = require("colors") // Pretty colors

// Master App class... where everthing goes through
class App extends EventEmitter {
    constructor(options) { // Options are in JSON format
        super()
        this.options = (options) ? options : { ip: "127.0.0.1", port: "80", autoRoute: true }// Defaults
        if (!JSON.stringify(this.options)) { // Verifies the option parameter before injection 
            throw new Error("Type Error: Options is not a vaild JSON object") // What the actual fuck
        }

        this.server
        this.Router = Router
    }

    // Creates a new http server
    createServer(options = this.options) {
        this.server = new HttpServer(options) // Ref. "./server.js"
        // On requests
        this.server.server.on("request", (req, res) => {
            if (req.url === "/favicon.ico") return // Denies favicon request... TODO!
            if (req.method === 'GET') this.emit('GET', req, res) // Emits GET event
            if (req.method === 'POST') this.emit('POST', req, res) // Emits POST event
            if (req.method === 'PUT') this.emit('PUT', req, res) // Emits PUT event
            if (req.method === 'DELETE') this.emit('DELETE', req, res) // Emits DELETE event
        })
    }

    // WORK ON THE PROTOTYPES AS THEY ARE FAULTY AND CAUSE SERVER INSTABILITY
    // Stops the server
    stopServer() {
        this.server.stopServer()
    }

    restartServer(n) {
        this.server.restart(n)
    }

    restartInterval(n) {
        this.server.restartInterval(n) 
    }

    // Checks if the app is listening
    get isListening() {
        return this.server.isListening()
    }
}

module.exports = App
