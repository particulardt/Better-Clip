import fs from "fs/promises"
import path from "path"
import axios from "axios";
import streamersListJson from "../src/utils/popularStreamers.json"
import type { popularNowStreamers } from "../types/twitchStreamer"

const accessToken = process.env.ACCESS_TOKEN;
const clientID = process.env.CLIENT_ID;
const gameId = process.env.GAME_ID;

const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": clientID
            };

    
// game_id=21779&first=10&language=en'
const params = {
    game_id: gameId,
    language: "ru",
    first: 25
}

const url = "https://api.twitch.tv/helix/streams";

// функция, которая
// через апи-кол собирает текущие топ25 стримеров
// сравнивает результат с тем, что в popularStreamers.json
// расширяет имеющийся файл новыми результатами
export const updateStreamersList = async function() {
    const streamersList: popularNowStreamers = streamersListJson;

    try {
        const res = await axios.get(url, {
            params,
            headers
        });

        // ниже полное безобразие, потом выведу в отдельную функцию
        const currentStreamersSet = new Set<string>();
        for (const currentStreamer of res.data.data) {
            currentStreamersSet.add(currentStreamer["user_id"]);
        }

        const savedStreamersSet = new Set<string>();
        for (const savedStreamer of streamersList.data) {
            savedStreamersSet.add(savedStreamer["user_id"]);
        }

        const newIds: string[] = [];
        for (const currentStreamerId of currentStreamersSet) {
            if (!savedStreamersSet.has(currentStreamerId)) {
                streamersList.data.push({
                    user_id: currentStreamerId
                });
                newIds.push(currentStreamerId);
            }
        }

        const filePath = path.join(__dirname, "../src/utils/popularStreamers.json");
        const streamersListJson = JSON.stringify(streamersList, null, 2);
        await fs.writeFile(filePath, streamersListJson, "utf-8");
        console.log("added the following ids to the json file: ", newIds);

    } catch (error) {
        console.error(error);
    }
}