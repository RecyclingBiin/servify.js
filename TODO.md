# To Do
*Things marked with `!` are important and of are higher priority than anything else*

- [ ] GZIP compression of large files (>= 5 MB) to supported clients via Node's built in zlib
- [ ] (!)Rewrite `router.js` so it supports redirects and more customization
- [X] (!) Create options.js with a OptionsWorker class that handles and distributes options based on need
- [ ] Clean up server.js
- [x] (!) Add `.restart()`, `.restartInterval()`, `.stop()`, and similar things as prototypes to server.js to control servers
- [ ] Plugins?
~~- [ ] Switch to Winston for more verbose logging~~
- [ ] (!!!!!!!!!!) Remind myself to update the version number instead of just hap-hazardly updating it
- [ ] Update docs so there is API structure and a simple beginners tutorial
- [X] POST and other request support
- [X] (!) Support raw html instead of just purely files
- [ ] (!) Make it so it regularly flushed cache or just get rid of server-side cache due to modern browser caching features
- [X] (!) Add on NPM
- [ ] CLI?