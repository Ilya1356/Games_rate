const http = require('http');
const path = require('path');
const express = require('express');

const gameRouteController = require("./controllers/game");
const mainRouteController = require("./controllers/main");
const voteRouteController = require("./controllers/vote");
const defaultRouteController = require("./controllers/default");
const staticFile = require("./appModules/http-utils/static-file");
const mimeTypes = require("./appModules/http-utils/mime-types");
const mainRoute = require('./routes/main');
const gamesRouter = require('./routes/games');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');

const PORT = 3005;
const app = express();

app.use(
    cors,
    bodyParser.json(),
    express.static(path.join(__dirname, 'public')),
    mainRoute,
    gamesRouter
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});

/*
const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
        case "/game":
            gameRouteController(res);
            break;
        case "/":
            res.statusCode = 200;
            staticFile(res, "/index.html", ".html");
            mainRouteController(res, "/index.html", ".html");
            break;
        case "/vote":
            voteRouteController(req, res);
            break;
        default:
            defaultRouteController(res, url);
            const extname = String(path.extname(url)).toLowerCase();
            if (extname in mimeTypes) {
                staticFile(res, url, extname);
            } else {
                res.statusCode = 404;
                res.end("Not Found");
            }

    }
});
*/