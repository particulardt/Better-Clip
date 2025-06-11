import streamersData from "../utils/popularStreamers.json";
import { getClipsForStreamer } from "./getClipsServices";
import type { twitchStreamer } from "../../types/twitchStreamer";
import type { Clip } from "./getClipsServices"

// генерирую строку с датой. аргументы МОЖНО менять
const startDate = createStartDateString(2025, 5, 25);

// здесь генерирую рандомный клип. логика такая:
// во внешнем цикле рандомно выбирается id стримера из json-файла;
// во внутреннем цикле пытаемся найти для этого id клип, который удовлетворяет условиям (игра, минимальные просмотры клипа);
// абсолютно возможна ситуация, при которой внутренний цикл не найдёт подходящий клип. тогда мы просто вернёмся во внешний цикл и сгенерируем нового стримера, новый id;
// по сложности это n^2, да, но:
//          api-запрос только во внешнем цикле, 
//          значения i и j ограничены 10^3, чтобы избежать совсем тяжёлых сценариев,
//          функция вызывается несколько раз за день, не более, так что сейчас не нужно переживать о масштабируемости
export const getRandomClip = async function() {
    let i = 1;

    while (true) {
        if (i > 1000) {
            console.error("could not find the right clip after all the iterations..");
            return;
        }

        const todaysStreamerId = chooseRandomStreamerId();

        const clips = await getClipsForStreamer(todaysStreamerId, {
        startDate
    })
    // console.log(clips);
    let clip: Clip = {
        id: "placeholder",
        game_id: "placeholder",
        view_count: 0
    };

    let j = 1;
    while (j <= 1000) {
        const randomPage = Math.ceil(Math.random() * (clips.length - 1));
        const randomIndex = Math.ceil(Math.random() * (clips[randomPage].length - 1));

        const curClip = clips[randomPage][randomIndex];

        // несколько раз были проблемы. это временная часть для отладки
        if (curClip === undefined) {
            console.log("CLIP NOT FOUND, RANDOM PAGE: ", randomPage, " RANDOM INDEX: ", randomIndex); 
        }
        // несколько раз были проблемы. это временная часть для отладки 
        if (curClip.game_id === undefined) {
            console.log("WEIRD CASE, CHECK IT OUT: ", curClip);
        }

        if (curClip.game_id === process.env.GAME_ID && curClip.view_count >= 10) {
            clip = curClip;
            break;
        }

        j++;
    }

    if (clip.id !== "placeholder") {
        console.log(clip);
        return;
    }

    console.log("could not find the right clip for a particular random streamer, trying again for another..");
    i++;
    }
}


function chooseRandomStreamerId () {
    const todaysIndex = Math.ceil(Math.random() * streamersData.data.length);
    const todaysStreamer = streamersData.data[todaysIndex] as twitchStreamer;
    const todaysStreamerId = todaysStreamer.user_id;
    console.log("randomized streamer id: ", todaysStreamerId);

    return todaysStreamerId;
}

// пример вызова: createStartDateString(2025, 5, 25);
function createStartDateString (year: number, month: number, day: number) {
    const dateString = `${year}-0${month}-${day}T00:00:00Z`
    console.log("generated the following string:", dateString);
    return dateString;
}   