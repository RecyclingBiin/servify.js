// Requires
const http = require("http") // Basic server functionality
const url = require("url") // URI decomposition
const fs = require("fs") // FileSys
const colors = require("colors") // Pretty colors
const mime = require("mime") // Detecting Filetypes and Parsing them for HTML headers
const path = require("path") // Path parsing
const cache = require("memory-cache")

async function Router(req, res, file, status, options) {
    /* 
        STRUCTURES   
    */
    this.req = req
    this.res = res
    this.options = (typeof options !== "undefined") ? options : {}
    this.options.xPoweredBy = (typeof this.options.xPoweredBy !== "undefined") ? this.options.xPoweredBy : true // options.xPoweredBy: defaults to true (will enable/disable the X-Powered-By header)
    this.options.customErrorPages = (typeof this.options.customErrorPages !== "undefined") ? this.options.customErrorPages : false // options.customErrorPages: displays custom error pages (ie. 404) from root directory; defualts to false
    this.options.pagesDirectory = path.normalize((typeof this.options.pagesDirectory !== "undefined") ? this.options.pagesDirectory : __dirname.slice(0, -4) + "/pages") // options.pagesDirectory: working directory (aka root) for pages; defaults to "../pages/"
    this.options.debug = (typeof this.options.debug !== "undefined") ? this.options.debug : false // options.debug: shows debug info; default is false (no messages)
    this.options.useCache = (typeof this.options.useCache !== "undefined") ? this.options.useCache : true // options.useCache: whether or not to use caching; defaults to true

    /* 
        VARIABLES
    */
    let data // the file data stream/buffer
    let dataType // Used to identify data types
    let cachedFile

    if (file === "/" || file === "") file = "/index.html" // Defualts to index.html
    let resolvedFile = this.options.pagesDirectory + file // resolved file given
    let customErrorPath = this.options.pagesDirectory + "404.html" // Custom Error Page Path
    let tempPagesDir = __dirname + "/temp/404.html" // Temp Error Page Path
    /* if (!fs.existsSync(resolvedFile) || !fs.statSync(resolvedFile).isFile()) {
        throw new Error("The file parameter is not a resolvable path or data buffer")
    } */
    


    try {
        cachedFile = cache.get(resolvedFile) // Gets cached file (if any)
        if (this.options.useCache && cachedFile) {
            // Cahce structure: {data: buffer, type: fileType}
            dataType = cachedFile.type
            data = cachedFile.data // Sets buffer "data"

        } else {
            fs.accessSync(resolvedFile, fs.constants.R_OK | fs.constants.W_OK) // Attempts access to desired file
            dataType = mime.getType(resolvedFile)
            data = await fs.readFileSync(resolvedFile) // Sets buffer "data"
            if (this.options.useCache) cache.put(resolvedFile, {data: data, type: dataType})

        }
    } catch (err) {
        if (this.options.debug) console.log(colors.yellow("[REQ] Warning: A request was made on an invalid file (" + req.url + ")"))

        if (this.options.customErrorPages) { // Checks if the customErrorPages opt param is changed
            try {
                cachedFile = cache.get(customErrorPath) // Gets cached file (if any)
                if (this.options.useCache && cachedFile) {
                    // Cahce structure: {data: buffer, type: fileType}
                    dataType = cachedFile.type
                    data = cachedFile.data // Sets buffer "data"

                } else {
                    fs.accessSync(customErrorPath, fs.constants.R_OK | fs.constants.W_OK) // Attempts access to custom error file
                    dataType = mime.getType(customErrorPath)
                    data = await fs.readFileSync(customErrorPath) // Attempts to get custom if there is one
                    if (this.options.useCache) cache.put(customErrorPath, {data: data, type: dataType})

                }
                
                if (this.options.debug) console.log(colors.yellow("Responding with custom 404"))

            } catch (err) { // Displays generic 404
                cachedFile = cache.get(tempPagesDir) // Gets cached file (if any)
                if (this.options.useCache && cachedFile) {
                    // Cahce structure: {data: buffer, type: fileType}
                    dataType = cachedFile.type
                    data = cachedFile.data // Sets buffer "data"

                } else {
                    fs.accessSync(tempPagesDir, fs.constants.R_OK | fs.constants.W_OK) // Attempts access to custom error file
                    dataType = mime.getType(tempPagesDir)
                    data = await fs.readFileSync(tempPagesDir) // Attempts to get custom if there is one
                    if (this.options.useCache) cache.put(tempPagesDir, {data: data, type: dataType})

                }

                if (this.options.debug) console.log(colors.yellow("Responding with generic 404"))
            }

        } else { // Displays generic 404
            cachedFile = cache.get(tempPagesDir) // Gets cached file (if any)
                if (this.options.useCache && cachedFile) {
                    // Cahce structure: {data: buffer, type: fileType}
                    dataType = cachedFile.type
                    data = cachedFile.data // Sets buffer "data"

                } else {
                    fs.accessSync(tempPagesDir, fs.constants.R_OK | fs.constants.W_OK) // Attempts access to generic error file
                    dataType = mime.getType(tempPagesDir)
                    data = await fs.readFileSync(tempPagesDir) // Attempts to get generic if there is one
                    if (this.options.useCache) cache.put(tempPagesDir, {data: data, type: dataType})

                }
            if (this.options.debug) console.log(colors.yellow("Responding with generic 404"))

        }
    }
    respond(status, dataType, data, res, (this.options.xPoweredBy)? {"X-Powered-By": "Servify.js"} : {}) // Responds to req with data
    return
}

/* 
    FUNCTIONS
*/
async function respond(status, dataType, data, res, headers) {
    if (headers.length < 1) headers = JSON.parse(headers) // Custom headers
    headers["Content-Type"] = dataType // Then adds the content type so client can parse

    res.writeHead(status, headers)
    res.write(data)
    res.end()
}

module.exports = Router