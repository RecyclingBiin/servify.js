// Sample JS file
const App = require("./index.js")
const servify = new App({pagesDirectory: __dirname + "/examples/space-science"})

servify.createServer()
servify.on("GET", (req, res) => {
    
})