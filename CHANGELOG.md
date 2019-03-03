
# Changelog
## 0.5.0
### Additions:
- Added server prototypes like `servify.stopServer()` and others that can control the server (ie. restart)
- You can restart the server at a set interval. For example `servify.restartInterval(86400000)` will make the server restart every 24 hours. This breaks any current active connections and flushes the cache
- The router now accepts a string of raw HTML as a response! Specify whether or not it is a string of HTML or a resolvable file path by enabling the `rawHTMLResponse` flag.
### Changes:
- Options are now parsed through `options.js` instead of being parsed through each call. Abstraction makes everything better!
- With auto-routing enabled, the router is now being fed the right configuration options.
- On NT or Win32 Systems, you have to confirm upon process exit. Saying yes or no will not affect if the process actually exits.
- The `pagesDirectory` now accepts UNIX styled and npm require styled file paths
### Removals
- Redline has been removed as a dependency due to a security issue
- Reduced unused dependencies and requires on each call.
  
## 0.4.3
### Changes:
- Router is now faster because file discovery was localized and abstracted
- The router *actually* now checks if it can access a file before reading from it
### Removals:
- Custom favicon feature removed. Instead, supply a favicon in the root working directory where the pages exist.
### Misc:
- Benchmarked Again! Impressive Results on Localhost
  
## 0.4.2
### Additions:
-  `useClientSideCache` and `maxCacheTimeout` options are things now
- Now supports client side caching with a default age at 60 minutes. Upon disabling client side caching, the no-cache response header is sent with each following request
### Changes:
-  `useCache` is now `userServerSideCache`
  
## 0.4.1
### Additions:
- Server side cache is now a thing for any "new" pages (ie. upon page load, the cached page will load instead)
-  `useCache` option is new and enables/disables cache
  
## 0.3.0
### Additions:
- Now capable of NPM support via custom path option
### Changes:
- Router is now completely rewritten... faster loads! (like 50% faster!)
- Router is used in server.js still when autorouting but it can be accessed when you use `servify.Router()`.
### Misc:
- Benchmarked it again with more load on it and it ran almost 50% faster than the previous router did! Looks like this one is a keeper!
  
## 0.2.1
### Additions:
- More options like favicons
### Changes:
- 404 pages now have a dedicated directory `./src/temp/`
- Debugging is now turned off by default
### Fixes:
- Got rid of invalid file error
- Got rid of automatic error DAE (denial and exit)
### Misc:
- Started running benchmarking tests with loadtest on localhost

  

## 0.2.0
### Additions:
- More options like X-Powered-By and Auto Routing
- Router.js
- Auto-routing
- Custom Error Pages
- Events now fire on `GET` and `POST` requests!

### Changes:
- Favicon requests are denied automatically
- Default 404 pages now display

  

## 0.1.1
### Additions:
- Application wrapper now encases server.js
### Changes:
- The main file `index.js` now points to the application
  
## 0.1.0
### Additions:
- Initial Commit
