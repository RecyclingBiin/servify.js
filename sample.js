// Sample JS file
const App = require("./index.js")
const servify = new App({pagesDirectory: "./examples/space-science"})

servify.createServer()
servify.on("GET", (req, res) => {
    
})

setTimeout(() => {
    servify.restartInterval(86400000) // Waits 3 seconds before restarting every 24 hourss
}, 3000)
