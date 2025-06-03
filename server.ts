import express from "express";
import "dotenv/config"
import { getClipsForStreamer, getRequest } from "./src/service/getClipsServices";
import { getClipsAndRandomThem } from "./src/service/clipOfTheDayServices";
import { checkIfJsonExists } from "./onBootstrap";


const app = express();
const port = process.env.PORT || 3000;

// const streamerId = process.env.BROADCASTER_ID as string;
// getClipsForStreamer(streamerId, getRequest);

checkIfJsonExists();
// getClipsAndRandomThem();







// app.listen(port, () => {
//     console.log("listening on ", port);
// });

