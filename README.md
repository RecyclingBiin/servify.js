
# Servify.js
*Its time to ditch Express.js and messy frameworks*
![](https://i.ibb.co/G3bQNFG/sample01-alt.png)

## About
### Why Servify.js?
Servify.js is a simple, quick, and easy to use server deployment tool. It allows you to run a HTTP server using JavaScript. It allows more functionality than just using the built in Node HTTP module, is easier to use than Express.js, and faster than Hapi.js.

### Don't Want to Learn a New Framework?
**Then don't.** Servify.js is not a framework; its an API that allows to you to do powerful things in JavaScript. No special knowledge needed.

### Quick Setup
As long as Node.js is installed, Servify.js can be started up in a couple of seconds with only a few lines of code.

### Customization
With features such as auto-routing, custom working directories, scheduled restarts, custom favicons, and more, the possibilities are endless. Run a blog, make an API, or anything else!
![](https://i.ibb.co/V9HcXCx/sample02-alt.png)

## Getting Started
### Prerequisites
You need to have Node.js (6.0.x) or greater installed along with NPM.  Make sure your project is already initialized
### Installing
```bash
npm install servify.js
```
### Running
![](https://i.ibb.co/NNJ60pr/codescreenshot.png)

## Speed
To benchmark we used [loadtest](https://www.npmjs.com/package/loadtest)
```bash
loadtest http://localhost:80/ -t 20 -c 25
```
#### Specs:

 - Intel i5-7200U @2.50 GHz
 - 8 GB RAM
#### Results:
##### Servify.js (Localhost)
```
        (Massive Performance improvements and caching)
        Completed requests:  3910
        Total errors:        0
        Total time:          20.008938698999998 s
        Requests per second: 195
        Mean latency:        0.7 ms

        Percentage of the requests served within a certain time
        50%      1 ms
        90%      1 ms
        95%      1 ms
        99%      2 ms
        100%      121 ms (longest request)
```
##### Servify.js (Heroku USA)
```
        Completed requests:  3905
        Total errors:        0
        Total time:          20.004686299 s
        Requests per second: 195
        Mean latency:        43.2 ms

        Percentage of the requests served within a certain time
        50%      38 ms
        90%      52 ms
        95%      64 ms
        99%      149 ms
        100%      415 ms (longest request)
```    
##### Servify.js (Heroku Europe)
```
        Completed requests:  3889
        Total errors:        0
        Total time:          20.0052501 s
        Requests per second: 194
        Mean latency:        142.5 ms

        Percentage of the requests served within a certain time
        50%      126 ms
        90%      144 ms
        95%      154 ms
        99%      508 ms
        100%      733 ms (longest request)
```

## Documentation
Need help? Look at our work in progress developer guides [here](https://recyclingbin.gitbook.io/servify-js/).
## Contributing
Want to become a contributor? Start by reading the [Contribution Guidelines](https://github.com/BryceDaly/servify.js/blob/master/CONTRIBUTING.md)!
## Licence
The official licence for this Servify.js repo is the MIT licence unless otherwise stated. (View [LICENCE](https://github.com/BryceDaly/servify.js/blob/master/LICENSE) for details)

