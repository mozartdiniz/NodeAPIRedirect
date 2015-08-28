# NodeAPIRedirect
A lightweight server and request proxy for static front-end projects

## How to use

Just set up the apiUrl variable if your api server and frontEndFiles with the folder where all your static files are.

```javascript
var apiUrl = process.argv[2] || 'http://api.server.com';
```

You can pass api server address as a parameter also.

```
node server.js http://myanotherapi.server.com
```

You may will need change the rounting adapting for your project, just change the follow code:

```javascript
app.use('/resources/javascripts/', express.static(frontEndFiles + '/resources/javascripts'));
```

For something that make sense for your project.

Now you can just run

```
node server.js http://myanotherapi.server.com
```

Now, just open your front-end project in your favorite browser.

http://localhost:3000/index

Remember, you will not open your index.html file, it is our mapping