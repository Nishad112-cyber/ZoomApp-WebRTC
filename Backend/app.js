import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";

import usersRoutes from "./src/routes/users.routes.js";


import cors from "cors";

const app= express();
const server= createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit :"40kb", extended :true}));


app.use("/api/v1/users", usersRoutes);
// app.use("/api/v2/users", newUserRoutes);
const start=  async () =>{

    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://n62495229_db_user:zoom@cluster1.qd5h3ej.mongodb.net/?appName=Cluster1")
    console.log(`mongo database connected to my ${connectionDb.connection.host}`)

   server.listen(app.get("port"), () => {
     console.log("listenning on port 8000");
  })
}

start();