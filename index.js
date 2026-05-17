import * as http from "node:http";
import * as fs from "node:fs";

const hostname = "127.0.0.1";

const port = 8080;

const paths = {
    "/": "./index.html",
    "/about": "./about.html",
    "/contact": "./contact-me.html",
};

const notFoundPath = "./404.html";

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(204);
        res.end();
        return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });

    const htmlPath =
        paths[req.url] !== undefined ? paths[req.url] : notFoundPath;

    fs.readFile(htmlPath, (error, data) => {
        if (error) {
            console.error(error);
        }
        res.end(data);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
