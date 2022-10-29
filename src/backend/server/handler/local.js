import("./bootstrap").then(async (module) => {
    console.log(`\nStarting HTTP server at http://localhost:${module.port}`);
    const server = module.app.listen(module.port);

    import("ws").then((module) => {
        const { WebSocketServer } = module;
        const urlPath = require("url");

        const wss = new WebSocketServer({
            perMessageDeflate: true,
            noServer: true,
        });
        wss.on("connection", function connection(ws) {
            const test = {
                id: "hub",
                date_set: Date.now(),
                blog: "maintenance",
            };
            console.log(test);
            ws.send(JSON.stringify(test));
        });

        server.on("upgrade", function upgrade(request, socket, head) {
            const { pathname } = new urlPath.URL(
                request.url,
                "http://localhost:3100/"
            );

            console.log("PATH", pathname);
            if (pathname === "/access") {
                console.log("Inside access");
                wss.handleUpgrade(request, socket, head, function done(ws) {
                    wss.emit("connection", ws, request);
                });
            }
        });
    });
});
