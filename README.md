
# Servify.js
*Its time to ditch Express.js and messy frameworks*
![](https://i.ibb.co/QfJNRZM/sample01.png)

## About
### Why Servify.js?
Servify.js is a simple, quick, and easy to use server deployment tool. It allows you to run a HTTP server using JavaScript. It allows more functionality than just using the built in Node HTTP module, is easier to use than Express.js, and faster than Hapi.js.

### Don't Want to Learn a New Framework?
**Then don't.** Servify.js is not a framework; its an API that allows to you to do powerful things in JavaScript. No special knowledge needed.

### Quick Setup
As long as Node.js is installed, Servify.js can be started up in a couple of seconds with only a few lines of code.
![enter image description here](https://i.ibb.co/NNJ60pr/codescreenshot.png)

### Speed
To benchmark we used [loadtest](https://www.npmjs.com/package/loadtest)
```bash
loadtest http://localhost:80/ -t 20 -c 25
```
#### Specs:

 - Intel i5-7200U @2.50 GHz
 - 8 GB RAM
#### Software:
 - Hapi.js 18.1.0
 - Express.js 4.16.4
#### Results:
##### Hapi.js
```
		Completed requests:  2011
        Total errors:        0
        Total time:          20.009875312 s
        Requests per second: 101
        Mean latency:        7.2 ms

        Percentage of the requests served within a certain time
        50%      3 ms
        90%      10 ms
        95%      22 ms
        99%      58 ms
        100%      68 ms (longest request)
```
##### Express
```
		Completed requests:  4102
        Total errors:        0
        Total time:          20.002137841 s
        Requests per second: 205
        Mean latency:        3.2 ms

        Percentage of the requests served within a certain time
        50%      2 ms
        90%      6 ms
        95%      10 ms
        99%      19 ms
        100%      58 ms (longest request)
```
##### Servify.js
```
		Completed requests:  3907
        Total errors:        0
        Total time:          20.005092201 s
        Requests per second: 195
        Mean latency:        3.7 ms

        Percentage of the requests served within a certain time
        50%      2 ms
        90%      9 ms
        95%      14 ms
        99%      19 ms
        100%      61 ms (longest request)
```

## Getting Started
### Prerequisites
You need to have Node.js (6.0.x) or greater installed along with NPM.  Make sure your project is already initialized
### Installing
```bash
npm install servify.js
```
### Running
```javascript
// Sample JS file
const  App  =  require("servify.js")
const  servify  =  new  App()

servify.createServer()
servify.on("GET",  (req,  res)  =>  {
	console.log("Hey, someone visited my site!")
})
```
