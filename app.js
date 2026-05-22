// // using just node

// const paths = {
//     "/": "index.html",
//     "/about": "about.html",
//     "/contact": "contact-me.html",
// };

// const notFoundPath = "./404.html";

// const server = http.createServer((req, res) => {
//     if (req.url === "/favicon.ico") {
//         res.writeHead(204);
//         res.end();
//         return;
//     }

//     res.writeHead(200, { "Content-Type": "text/html" });

//     const htmlPath =
//         paths[req.url] !== undefined ? paths[req.url] : notFoundPath;

//     fs.readFile(htmlPath, (error, data) => {
//         if (error) {
//             console.error(error);
//         }
//         res.end(data);
//     });
// });

import express from "express";

// load env file

process.loadEnvFile(".env");

const app = express();

const hostname = "127.0.0.1";

const PORT = process.env.PORT;

// __dirname does not work with es modules

const __dirname = import.meta.dirname;

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
    res.sendFile("about.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
    res.sendFile("contact-me.html", { root: __dirname });
});
app.use((req, res) => {
    res.status(404).sendFile("404.html", { root: __dirname });
});
app.listen(PORT, hostname, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
