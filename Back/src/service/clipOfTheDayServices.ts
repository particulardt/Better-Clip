import fs from "fs/promises";
import path from "path";
import { getClipsForStreamer, type Clip, getRequest } from "./getClipsServices";
import type { twitchStreamer, popularNowStreamers } from "../../types/twitchStreamer";

interface RandomClipOptions {
    startDate?: string;       // ISO
    gameId?: string;          // приоритетнее, чем getRequest.gameId
    minViewCount?: number;    // минимум просмотров для отбора
    maxOuterIterations?: number; // лимит попыток по стримерам
    maxInnerIterations?: number; // лимит попыток по клипам
}

function getDefaultStartDateISO(daysAgo: number = 30): string {
    const ms = 24 * 60 * 60 * 1000;
    return new Date(Date.now() - daysAgo * ms).toISOString();
}

function getRandomIndex(limit: number): number {
    if (limit <= 0) return 0;
    return Math.floor(Math.random() * limit);
}

/**
 * Возвращает рандомный клип по списку стримеров с вменяемыми ограничениями.
 * Возвращает undefined, если подходящий клип не найден за отведённое число попыток.
 */
export const getRandomClip = async function (
    streamers?: twitchStreamer[],
    options: RandomClipOptions = {}
) {
    const maxOuter = Math.max(1, options.maxOuterIterations ?? 1000);
    const maxInner = Math.max(1, options.maxInnerIterations ?? 1000);
    const minViews = Math.max(0, options.minViewCount ?? 10);
    const startDate = options.startDate ?? getDefaultStartDateISO(30);
    const targetGameId = options.gameId ?? getRequest.gameId;

    // лениво загружаем список стримеров из JSON, если он не передан
    if (!Array.isArray(streamers) || streamers.length === 0) {
        const filePath = path.join(__dirname, "../utils/popularStreamers.json");
        try {
            const file = await fs.readFile(filePath, "utf-8");
            const parsed = JSON.parse(file) as popularNowStreamers;
            streamers = parsed.data;
        } catch (error) {
            console.error("Failed to load popularStreamers.json:", error);
            return;
        }
    }

    for (let i = 1; i <= maxOuter; i++) {
        const todaysStreamer = streamers[getRandomIndex(streamers.length)];
        const todaysStreamerId = todaysStreamer.user_id;

        const pages = await getClipsForStreamer(todaysStreamerId, { startDate });

        // Перебираем случайные клипы ограниченное число раз
        for (let j = 1; j <= maxInner; j++) {
            if (pages.length === 0) break;

            const pageIdx = getRandomIndex(pages.length);
            const page = pages[pageIdx];
            if (!page || page.length === 0) continue;

            const clipIdx = getRandomIndex(page.length);
            const curClip = page[clipIdx];
            if (!curClip) continue;

            if ((targetGameId ? curClip.game_id === targetGameId : true) && curClip.view_count >= minViews) {
                return curClip;
            }
        }
    }

    console.warn("Could not find a suitable clip within the configured iteration limits.");
    return;
}

// пример вызова: createStartDateString(2025, 5, 25);
function createStartDateString(year: number, month: number, day: number) {
    const yyyy = String(year);
    const mm = (month < 10 ? "0" : "") + String(month);
    const dd = (day < 10 ? "0" : "") + String(day);
    const dateString = `${yyyy}-${mm}-${dd}T00:00:00Z`;
    console.debug("generated the following string:", dateString);
    return dateString;
}