// Sample JS file
const App = require("./index.js")
const servify = new App({pagesDirectory: "D:/drive.exe/servify.js/examples/space-science"})

servify.createServer()
servify.on("GET", (req, res) => {
    
})

// Benchmarking: loadtest http://localhost:80/ -t 20 -c 25