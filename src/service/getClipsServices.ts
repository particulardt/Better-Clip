import axios from "axios";

const url = "https://api.twitch.tv/helix/clips";
const accessToken = process.env.ACCESS_TOKEN;
const clientID = process.env.CLIENT_ID;
const gameId = process.env.GAME_ID;

interface Params {
    gameId?: string;
    startDate?: string;
    endDate?: string;
    perPage?: number
}

interface Clip {
    id: string;
    game_id: string
}

export const getClipsForStreamer = async function (streamerId: string, params: Params){
    if (!streamerId) {
        throw new Error("streamer id is required");
    }

    const started_at = params.startDate || "2025-01-01T00:00:00Z";
    const ended_at = params.endDate || new Date().toISOString();
    const clips: Clip[][] = [];

    try {
        const res = await axios.get(url, {
            params: {
                "broadcaster_id": streamerId,
                started_at,
                ended_at,
                first: params.perPage || 20
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": clientID
            }
        });

        clips.push(res.data.data)

        let curPage = res.data.pagination.cursor;

        while (curPage) {
            const res = await axios.get(url, {
            params: {
                broadcaster_id: streamerId,
                started_at,
                ended_at,
                first: params.perPage,
                after: curPage
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": clientID
            }
        });

        clips.push(res.data.data);
        curPage = res.data.pagination.cursor;
        }

        if (params.gameId) {
            const filteredClips: Clip[][] = [];
            for (const arr of clips) {
                filteredClips.push(arr.filter( (clip) => clip.game_id === params.gameId));
            }
            return filteredClips;
        }

        return clips;
    }
    catch (err) {
        console.error(err);
        return [];
    }
};

export const getRequest: Params = {
    gameId,
    startDate: "2025-05-01T00:00:00Z",
    // endDate: "2024-01-01T00:00:00Z",
    perPage: 100
}

