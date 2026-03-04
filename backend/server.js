require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const authRoutes = require("./src/modules/auth/auth.route");
const goalRoutes = require("./src/modules/goal/goal.route");
const profileRoutes = require("./src/modules/profile/profile.route");
const savingRoutes = require("./src/modules/saving/saving.route");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SaveMate chay API ");
});

//ROUTE
app.use("/api/auth", authRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/saving", savingRoutes);


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server chay cong ${PORT}`);
});