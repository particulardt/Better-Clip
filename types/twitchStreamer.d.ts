interface twitchStreamer {
    "user_id": string;
    "user_login": string
}

interface popularNowStreamers {
    "data": twitchStreamer[]
}

export type { twitchStreamer, popularNowStreamers }