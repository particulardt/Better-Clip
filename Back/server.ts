import express from "express";
import "dotenv/config"
import { onBootstrapFunction } from "./onBootstrap/onBootstrapFunction";
import { getRandomClip } from "./src/service/clipOfTheDayServices";
import { getClipsForStreamer } from "./src/service/getClipsServices";


const app = express();
const port = process.env.PORT || 3000;

app.get("/randomClip", async (req, res) => {
    try {
        const clip = await getRandomClip();
        res.json({ clip });
    } catch(error) {
        const msg = error instanceof Error ? error.message : "unknown error";
        res.send({ error: msg });
    }
})

app.get("/clips/:streamerId", async (req, res) => {
    const { streamerId } = req.params;
    console.log("streamerId:", streamerId);
    // пока что пустой объект вторым, потому что так уж написана функция изначально. потом надо будет переделать;
    const clips = await getClipsForStreamer(streamerId, {});
    console.log("клипы:", clips);
    res.json({ clips });
})

onBootstrapFunction();

app.listen(port, () => {
    console.log("listening on ", port);
});

