// Requires
const http = require("http") // Basic server functionality
const url = require("url") // URI decomposition
const fs = require("fs") // FileSys
const colors = require("colors") // Pretty colors
const mime = require("mime") // Detecting Filetypes and Parsing them for HTML headers
const path = require("path") // Path parsing

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


    /* 
        VARIABLES
    */
    let data // the file data stream/buffer
    let dataType // Used to identify data types
    let pathOut // path to output

    if (file === "/" || file === "") file = "/index.html" // Defualts to index.html
    let resolvedFile = this.options.pagesDirectory + file // resolved file given
    let customErrorPath = this.options.pagesDirectory + "404.html" // Custom Error Page Path
    let tempPagesDir = __dirname + "/temp/404.html" // Temp Error Page Path
    /* if (!fs.existsSync(resolvedFile) || !fs.statSync(resolvedFile).isFile()) {
        throw new Error("The file parameter is not a resolvable path or data buffer")
    } */



    try {
        fs.accessSync(resolvedFile, fs.constants.R_OK | fs.constants.W_OK) // Attempts access to desired file
        pathOut = resolvedFile
        data = await fs.readFileSync(pathOut) // Sets buffer "data"
    } catch (err) {
        console.log(colors.yellow("[REQ] Warning: A request was made on an invalid file (" + req.url + ")"))
        if (this.options.customErrorPages) { // Checks if the customErrorPages opt param is changed
            pathOut = customErrorPath
            try {
                data = await fs.readFileSync(pathOut) // Attempts to get custom if there is one
                console.log(colors.yellow("Responding with custom 404"))
            } catch (err) { // Displays generic 404
                pathOut = tempPagesDir
                date = await fs.readFileSync(pathOut)
                console.log(colors.yellow("Responding with generic 404"))
            }
        } else { // Displays generic 404
            pathOut = tempPagesDir
            data = await fs.readFileSync(pathOut)
            console.log(colors.yellow("Responding with generic 404"))
        }
    }
    respond(status, mime.getType(pathOut), data, res, this.options.xPoweredBy) // Responds to req with data
    return
}

/* 
    FUNCTIONS
*/
async function respond(status, dataType, data, res, xPoweredBy) {
    let headerOpts = {}

    if (xPoweredBy) headerOpts["X-Powered-By"] = "Servify.js"
    // Allows for further expansion and possibly custom headers?? :D

    headerOpts["Content-Type"] = dataType // Then adds the content type so client can parse

    res.writeHead(status, headerOpts)
    res.write(data)
    res.end()
}

module.exports = Router