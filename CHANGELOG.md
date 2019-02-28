# Changelog
## 0.4.3
### Changes:
 - Router is now faster because file discovery was localized and abstracted
 - The router *acutally* now checks if it can access a file before reading from it
### Misc:
 - Benchmarked Again! 

## 0.4.2
### Additions:
 - `useClientSideCache` and `maxCacheTimeout` options are things now
 - Now supports client side caching with a default age at 60 minutes. Upon disabling client side caching, the no-cache response header is sent with each following request
### Changes:
 - `useCache` is now `userServerSideCache`

## 0.4.1
### Additions:
 - Server side cache is now a thing for any "new" pages (ie. upon page load, the cached page will load instead)
 - `useCache` option is new and enables/disables cache

## 0.3.0
### Additions:
 - Now capible of NPM support via custom path option
### Changes:
 - Router is now completely rewritten... faster loads! (like 50% faster!)
 - Router is used in server.js still when autorouting but it can be accessed when you use `servify.Router()`.
### Misc:
 - Benchmarked it again with more load on it and it ran almost 50% faster than the previous router did! Looks like this one is a keeper!

## 0.2.1
### Additions:
 - More options like favicons
### Changes:
 - 404 pages now have a deticated directory `./src/temp/`
 - Debuginng is now turned off by default
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
- Inital Commit