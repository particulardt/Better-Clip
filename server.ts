import express from "express";
import "dotenv/config"
import { getClipsForStreamer, getRequest } from "./src/service/clipsServices";


const app = express();
const port = process.env.PORT || 3000;

const streamerId = process.env.BROADCASTER_ID as string;
getClipsForStreamer(streamerId, getRequest);








// app.listen(port, () => {
//     console.log("listening on ", port);
// });

