import axios, { AxiosInstance } from "axios";

const url = "https://api.twitch.tv/helix/clips";
const accessToken = process.env.ACCESS_TOKEN;
const clientID = process.env.CLIENT_ID;
const gameId = process.env.GAME_ID;

/**
 * Входные параметры запроса клипов
 */
interface Params {
    gameId?: string;
    startDate?: string; // ISO string
    endDate?: string;   // ISO string
    perPage?: number;   // 1..100, twitch максимум 100
}

/**
 * Минимально необходимые поля клипа Twitch
 */
export interface Clip {
    id: string;
    game_id: string;
    view_count: number;
}

interface TwitchClipsResponse {
    data: Clip[];
    pagination?: {
        cursor?: string;
    };
}

function assertRequiredEnv(variable: string | undefined, name: string): string {
    if (!variable) {
        throw new Error(`Missing required env var ${name}`);
    }
    return variable;
}

// Валидируем переменные окружения один раз и создаём axios-инстанс с общими заголовками
const AUTH_TOKEN = assertRequiredEnv(accessToken, "ACCESS_TOKEN");
const CLIENT_ID = assertRequiredEnv(clientID, "CLIENT_ID");

const http: AxiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Client-Id": CLIENT_ID
    }
});

function getDefaultStartDateISO(daysAgo: number = 30): string {
    const msInDay = 24 * 60 * 60 * 1000;
    return new Date(Date.now() - daysAgo * msInDay).toISOString();
}

/**
 * Получить клипы для заданного стримера с постраничной выборкой.
 * Возвращаемый тип совместим с текущими потребителями: массив страниц клипов (Clip[][]).
 */
export const getClipsForStreamer = async function (streamerId: string, params: Params) {
    if (!streamerId || typeof streamerId !== "string" || streamerId.trim().length === 0) {
        throw new Error("streamer id is required");
    }

    const started_at = params?.startDate || getDefaultStartDateISO(30);
    const ended_at = params?.endDate || new Date().toISOString();
    const perPage = Math.max(1, Math.min(100, params?.perPage ?? 20));
    const paramGameId = params?.gameId;

    const pages: Clip[][] = [];

    try {
        // первая страница
        const firstResponse = await http.get<TwitchClipsResponse>(url, {
            params: {
                broadcaster_id: streamerId,
                started_at,
                ended_at,
                first: perPage
            }
        });

        pages.push(firstResponse.data.data);

        let cursor: string | undefined = firstResponse.data.pagination?.cursor;

        // последующие страницы
        while (cursor) {
            const pageResponse = await http.get<TwitchClipsResponse>(url, {
                params: {
                    broadcaster_id: streamerId,
                    started_at,
                    ended_at,
                    first: perPage,
                    after: cursor
                }
            });

            pages.push(pageResponse.data.data);
            cursor = pageResponse.data.pagination?.cursor;
        }

        if (paramGameId) {
            const filteredPages: Clip[][] = [];
            for (const arr of pages) {
                filteredPages.push(arr.filter((clip) => clip.game_id === paramGameId));
            }
            return filteredPages;
        }

        return pages;
    } catch (error) {
        console.error("Failed to fetch clips:", error);
        return [];
    }
};

// Демонстрационные дефолтные параметры запроса (необязательны для вызова функции)
export const getRequest: Params = {
    gameId,
    startDate: getDefaultStartDateISO(30),
    perPage: 100
};

