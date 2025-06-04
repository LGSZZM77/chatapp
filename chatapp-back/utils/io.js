const userController = require("../Controllers/user.controller");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
        cb({ok: true, data: user});
      } catch (error) {
        cb({ok: false, error: error.message});
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
