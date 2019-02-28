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

        Todo: fix this fucking mess and replace it with an option handler
    */
    this.req = req
    this.res = res
    this.options = (typeof options !== "undefined") ? options : {}
    this.options.xPoweredBy = (typeof this.options.xPoweredBy !== "undefined") ? this.options.xPoweredBy : true // options.xPoweredBy: defaults to true (will enable/disable the X-Powered-By header)
    this.options.customErrorPages = (typeof this.options.customErrorPages !== "undefined") ? this.options.customErrorPages : false // options.customErrorPages: displays custom error pages (ie. 404) from root directory; defualts to false
    this.options.pagesDirectory = path.normalize((typeof this.options.pagesDirectory !== "undefined") ? this.options.pagesDirectory : __dirname.slice(0, -4) + "/pages") // options.pagesDirectory: working directory (aka root) for pages; defaults to "../pages/"
    this.options.debug = (typeof this.options.debug !== "undefined") ? this.options.debug : false // options.debug: shows debug info; default is false (no messages)
    this.options.useServerSideCache = (typeof this.options.useServerSideCache !== "undefined") ? this.options.useServerSideCache : true // options.useServerSideCache: whether or not to use server caching; defaults to true
    this.options.useClientSideCache = (typeof this.options.useClientSideCache !== "undefined") ? this.options.useClientSideCache : true // options.useClientSideCache: whether or not to use client caching; defaults to true
    this.options.maxCacheTimeout = (typeof this.options.maxCacheTimeout !== "undefined") ? this.options.maxCacheTimeout : 3600 // options.maxCacheTimeout: the max amount of seconds cache can exist client-side; defaults to 1 hr

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

    /* 
        Handler
    */

    // Should change to a switch statement if possible
    try {
        cachedFile = await serverSideCaching(resolvedFile, this.options.useServerSideCache)
        dataType = cachedFile.dataType
        data = cachedFile.data

    } catch (err) {
        if (this.options.debug) console.log(colors.yellow("[REQ] Warning: A request was made on an invalid file (" + req.url + ")"))

        if (this.options.customErrorPages) { // Checks if the customErrorPages opt param is changed
            try {
                cachedFile = await serverSideCaching(customErrorPath, this.options.useServerSideCache)
                dataType = cachedFile.dataType
                data = cachedFile.data
                if (this.options.debug) console.log(colors.yellow("Responding with custom 404"))

            } catch (err) { // Displays generic 404
                cachedFile = await serverSideCaching(tempPagesDir, this.options.useServerSideCache)
                dataType = cachedFile.dataType
                data = cachedFile.data
                if (this.options.debug) console.log(colors.yellow("Responding with generic 404"))
            }

        } else { // Displays generic 404
            cachedFile = await serverSideCaching(tempPagesDir, this.options.useServerSideCache)
            dataType = cachedFile.dataType
            data = cachedFile.data
            if (this.options.debug) console.log(colors.yellow("Responding with generic 404"))

        }
    }
    let _tempHeaders = {}
    if (this.options.xPoweredBy) _tempHeaders["X-Powered-By"] = "Servify.js"
    if (this.options.useClientSideCache) { _tempHeaders["Cache-Control"] = "max-age=" + this.options.maxCacheTimeout } else { _tempHeaders["Cache-Control"] = "no-cache" }
    respond(status, dataType, data, res, _tempHeaders) // Responds to req with data
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

async function serverSideCaching(path, useServerSideCache) {
    try {
        cachedFile = cache.get(path) // Gets cached file (if any)
        if (useServerSideCache && cachedFile) {
            // Cahce structure: {data: buffer, type: fileType}
            dataType = cachedFile.type
            data = cachedFile.data // Sets buffer "data"

        } else {
            fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK) // Attempts access to desired file
            dataType = mime.getType(path)
            data = await fs.readFileSync(path) // Sets buffer "data"
            if (useServerSideCache) cache.put(path, { data: data, type: dataType })

        }
        return { data: data, dataType: dataType }
    } catch (err) {
        throw new Error()
    }

}

module.exports = Router