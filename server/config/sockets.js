module.exports = function (server) {
    let io = require("socket.io").listen(server);
    
    io.on("connection", function (socket) {
        console.log("I Love Lamp!");

        socket.on('successfulPick', function (data) {
            io.emit("updateDraft");
        });

    });
}
