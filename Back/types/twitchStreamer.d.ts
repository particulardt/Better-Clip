interface twitchStreamer {
    "user_id": string;
}

interface popularNowStreamers {
    "data": twitchStreamer[]
}

export type { twitchStreamer, popularNowStreamers }