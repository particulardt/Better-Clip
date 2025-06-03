import streamersData from "../utils/popularStreamers.json";
import { getClipsForStreamer } from "./getClipsServices";
import type { twitchStreamer } from "../../types/twitchStreamer";
// const accessToken = process.env.ACCESS_TOKEN;
// const clientID = process.env.CLIENT_ID;

// генерирую рандомный индекс массива
    const todaysIndex = Math.ceil(Math.random() * streamersData.data.length);
    const todaysStreamer = streamersData.data[todaysIndex] as twitchStreamer;
    const todaysStreamerId = todaysStreamer.user_id;
    console.log("randomized streamer id: ", todaysStreamerId);
// запрашиваю клипы по апи для выпавшего стримера 
    export const getClipsAndRandomThem = async function() {
        const clips = await getClipsForStreamer(todaysStreamerId, {
            startDate: "2025-05-25T00:00:00Z",
        })
        // console.log(clips);

        const randomPage = Math.ceil(Math.random() * (clips.length - 1));
        console.log("generated random page: ", randomPage);
        const randomIndex = Math.ceil(Math.random() * (clips[randomPage].length - 1));
        console.log("generated random index: ", randomIndex);

        console.log(clips[randomPage][randomIndex]);
    }

