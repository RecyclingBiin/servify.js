// Requires
const fs = require("fs") // FileSys
const colors = require("colors") // Pretty colors
const mime = require("mime") // Detecting Filetypes and Parsing them for HTML headers
const path = require("path-browserify") // Path parsing
const cache = require("memory-cache")
const Options = require("./options")

let that

async function Router(req, res, file, status, options) {
    /* 
        STRUCTURES   

    */
    this.req = req
    this.res = res
    this.options = Options(options)

    that = this
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
        HANDLER
    */
    if (this.options.rawHTMLResponse) {
        respond(status, "text/html", file, res, {}) // Responds to req with HTML string
        return
    }

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
    respond(status, dataType, data, res, {}) // Responds to req with file data
    return
}

/* 
    FUNCTIONS
*/
function isOptEmpty(option, fallback) {
    return (typeof option !== "undefined") ? option : fallback
}

async function respond(status, dataType, data, res, headers) {
    if (headers.length < 1) headers = JSON.parse(headers) // Custom headers
    if (that.options.xPoweredBy) headers["X-Powered-By"] = "Servify.js"
    if (that.options.useClientSideCache) { headers["Cache-Control"] = "max-age=" + that.options.maxCacheTimeout } else { headers["Cache-Control"] = "no-cache" }

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