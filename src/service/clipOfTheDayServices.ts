import streamersData from "../utils/popularStreamers.json";
import { getClipsForStreamer } from "./getClipsServices";
import type { twitchStreamer } from "../../types/twitchStreamer";
import type { Clip } from "./getClipsServices"


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
        startDate
    })
    // console.log(clips);
    let clip: Clip = {
        id: "placeholder",
        game_id: "placeholder"
    };

    // может, хотя бы for с каким-нибудь произвольным ограничением? здесь слишком большой потенциал для проблем
    // особенно учитывая, что я собрал стримеров с одной даты, а запрашивать клипы могут для совсем другой
    // там нужных клипов может попросту уже не быть
    while (clip.game_id !== process.env.GAME_ID) {
        const randomPage = Math.ceil(Math.random() * (clips.length - 1));
        const randomIndex = Math.ceil(Math.random() * (clips[randomPage].length - 1));
        clip = clips[randomPage][randomIndex];
        console.log("randomized the clip with the following id: ", clip.game_id);
    }

    console.log(clip);
    }


// пример вызова: createStartDateString(2025, 5, 25);
function createStartDateString (year: number, month: number, day: number) {
    const dateString = `${year}-0${month}-${day}T00:00:00Z`
    console.log("generated the following string:", dateString);
    return dateString;
}   