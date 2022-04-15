import {Collection} from "../deps.ts";
import {Channel} from "../deps.ts";
import {decode, encode} from "./cache.ts";

export async function override_channels(channels: Collection<bigint, Channel>) {
    return await fetch(`https://localhost:9493/channels/set`, {
        method: 'POST',
        body: encode(new Map(channels))
    })
}

export async function channel_set(channelId: bigint, channel: Channel) {
    try {
        const c = {
            ...channel,
            permissionOverwrites: channel.permissionOverwrites.map((c) => c.toString())
        }

        return await fetch(`https://localhost:9493/channels/set/${channelId}`, {
            method: 'POST',
            body: encode(c)
        })
    } catch (_) {
        return undefined
    }
}

export async function channel_size() {
    try {
        const res = await fetch(`https://localhost:9493/channels/size`)

        const data = await res.arrayBuffer();
        return decode(new Uint8Array(data)) as number
    } catch (_) {
        return 0
    }
}

export async function channel_get(channelId: bigint) {
    try {
        const res = await fetch(`https://localhost:9493/channels/get/${channelId}`)

        const data = await res.arrayBuffer();

        const decoded = decode(new Uint8Array(data));
        return {
            ...decoded,
            permissionOverwrites: decoded.permissionOverwrites.map((c: string) => BigInt(c))
        } as Channel
    } catch(_) {
        return undefined
    }
}

export async function channel_has(channelId: bigint) {
    const res = await fetch(`https://localhost:9493/channels/has/${channelId}`)

    const data = await res.text();

    return data === "true"
}

export async function channel_delete(channelId: bigint) {
    await fetch(`https://localhost:9493/channels/delete/${channelId}`, {
        method: 'POST'
    })
}

export async function get_channels(): Promise<Array<Channel>> {
    const res = await fetch(`https://localhost:9493/channels/get`, {
        method: 'GET',
    })

    const data = await res.arrayBuffer();

    return decode(new Uint8Array(data)) as Array<Channel>
}
