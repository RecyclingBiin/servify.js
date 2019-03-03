// Requires
const path = require("path-browserify") // Path parsing (UNIX style)


function OptionsHandler(options) {
    this.options = options

    // Critical Server Options
    this.options.ip = isOptEmpty(this.options.ip, "127.0.0.1") // options.ip: defaults to 127.0.0.1 (aka localhost)
    this.options.port = isOptEmpty(this.options.port, "80") // options.port: defaults to port 80 (aka HTTP defualt port)
    this.options.autoRoute = isOptEmpty(this.options.autoRoute, true) // options.autoRoute: defualts to true (will auto-respond to get requests)

    // Header Options
    this.options.xPoweredBy = isOptEmpty(this.options.xPoweredBy, true) // options.xPoweredBy: defaults to true (will enable/disable the X-Powered-By header)

    // Page Display Options
    this.options.customErrorPages = isOptEmpty(this.options.customErrorPages, false) // options.customErrorPages: displays custom error pages (ie. 404) from root directory; defualts to false
    this.options.pagesDirectory = path.normalize(isOptEmpty(this.options.pagesDirectory, __dirname + "/pages")) // options.pagesDirectory: working directory (aka root) for pages; defaults to "../pages/"

    // Caching
    this.options.useServerSideCache = isOptEmpty(this.options.useServerSideCache, true) // options.useServerSideCache: whether or not to use server caching; defaults to true
    this.options.useClientSideCache = isOptEmpty(this.options.useClientSideCache, true) // options.useClientSideCache: whether or not to use client caching; defaults to true
    this.options.maxCacheTimeout = isOptEmpty(this.options.maxCacheTimeout, 3600) // options.maxCacheTimeout: the max amount of seconds cache can exist client-side; defaults to 1 hr

    // Debugging
    this.options.rawHTMLResponse = isOptEmpty(this.options.rawHTMLResponse, false)  // options.rawHTMLResponse: whether or not the file parameter is a string of HTML or a resolveable file path; defaults to false (resolvable file path

    // Parsing Options (ROUTER)
    this.options.rawHTMLResponse = isOptEmpty(this.options.rawHTMLResponse, false)  // options.rawHTMLResponse: whether or not the file parameter is a string of HTML or a resolveable file path; defaults to false (resolvable file path

    return this.options
}

function isOptEmpty(option, fallback) {
    return (typeof option !== "undefined") ? option : fallback
}


module.exports = OptionsHandler