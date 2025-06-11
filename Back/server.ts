import express from "express";
import "dotenv/config"
import { onBootstrapFunction } from "./onBootstrap/onBootstrapFunction";


const app = express();
const port = process.env.PORT || 3000;

onBootstrapFunction();








// app.listen(port, () => {
//     console.log("listening on ", port);
// });

