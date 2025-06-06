import streamersData from "../utils/popularStreamers.json";
import { getClipsForStreamer } from "./getClipsServices";
import type { twitchStreamer } from "../../types/twitchStreamer";


// генерирую рандомный индекс массива
const todaysIndex = Math.ceil(Math.random() * streamersData.data.length);
const todaysStreamer = streamersData.data[todaysIndex] as twitchStreamer;
const todaysStreamerId = todaysStreamer.user_id;
console.log("randomized streamer id: ", todaysStreamerId);

// генерирую строку с датой. аргументы МОЖНО менять
const startDate = createStartDateString(2025, 5, 25);

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


// пример вызова: createStartDateString(2025, 5, 25);
function createStartDateString (year: number, month: number, day: number) {
    const dateString = `${year}-0${month}-${day}T00:00:00Z`
    console.log("generated the following string:", dateString);
    return dateString;
}   