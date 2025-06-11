import fs from "fs/promises"
import path from "path"
import axios from "axios";
import streamersListJson from "../src/utils/popularStreamers.json"
import type { popularNowStreamers, twitchStreamer } from "../types/twitchStreamer"

const accessToken = process.env.ACCESS_TOKEN;
const clientID = process.env.CLIENT_ID;
const gameId = process.env.GAME_ID;

const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": clientID
            };

    
// пример: game_id=21779&first=10&language=en'
const params = {
    game_id: gameId,
    language: "ru",
    first: 25
}

const url = "https://api.twitch.tv/helix/streams";

// функция, которая
// через апи-кол собирает текущие топ n стримеров
// сравнивает результат с тем, что в popularStreamers.json
// расширяет имеющийся файл новыми результатами
export const updateStreamersList = async function() {
    const streamersList: popularNowStreamers = streamersListJson;

    try {
        const res = await axios.get(url, {
            params,
            headers
        });

        await addNewStreamersToJson(streamersList, res.data.data);
    } catch (error) {
        console.error(error);
    }
}

const addNewStreamersToJson = async function(savedStreamerList: popularNowStreamers, currentStreamerList: twitchStreamer[]) {
    const currentStreamersSet = new Set<string>();
        for (const currentStreamer of currentStreamerList) {
            currentStreamersSet.add(currentStreamer["user_id"]);
        }

        const savedStreamersSet = new Set<string>();
        for (const savedStreamer of savedStreamerList.data) {
            savedStreamersSet.add(savedStreamer["user_id"]);
        }

        const newIds: string[] = [];
        for (const currentStreamerId of currentStreamersSet) {
            if (!savedStreamersSet.has(currentStreamerId)) {
                savedStreamerList.data.push({
                    user_id: currentStreamerId
                });
                newIds.push(currentStreamerId);
            }
        }

        const filePath = path.join(__dirname, "../src/utils/popularStreamers.json");
        const streamersListJson = JSON.stringify(savedStreamerList, null, 2);
        await fs.writeFile(filePath, streamersListJson, "utf-8");

        if (newIds.length) {
            console.log("added the following ids to the json file: ", newIds);
        }
        else {
            console.log("the json file is up to date! nothing added");
        }
}