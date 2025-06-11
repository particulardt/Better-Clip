import express from "express";
import "dotenv/config"
import { onBootstrapFunction } from "./onBootstrap/onBootstrapFunction";
import { getRandomClip } from "./src/service/clipOfTheDayServices";


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

onBootstrapFunction();

app.listen(port, () => {
    console.log("listening on ", port);
});

