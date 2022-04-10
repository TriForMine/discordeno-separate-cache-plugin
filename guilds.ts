import {Collection} from "../deps.ts";
import {Guild} from "../deps.ts";
import {decode, encode} from "./cache.ts";

export async function override_guilds(guilds: Collection<bigint, Guild>) {
    return await fetch(`https://localhost:9493/guilds/set`, {
        method: 'POST',
        body: encode(new Map(guilds))
    })
}

export async function guild_set(guildId: bigint, guild: Guild) {
    try {
        const g = {
            ...guild,
            joinedAt: guild.joinedAt?.toString(),
            roles: guild.roles ? new Map(guild.roles.map(r => {
                return [r.id, {
                    ...r,
                    icon: r.icon?.toString()
                }]
            })) : undefined
        }

        return await fetch(`https://localhost:9493/guilds/set/${guildId}`, {
            method: 'POST',
            body: encode(g)
        })
    } catch (err) {
        console.error(err)
        return undefined
    }
}

export async function guild_get(guildId: bigint) {
    try {
        const res = await fetch(`https://localhost:9493/guilds/get/${guildId}`)

        const data = await res.arrayBuffer();

        const decoded = decode(new Uint8Array(data));
        return {
            ...decoded,
            joinedAt: decoded.joinedAt ? parseInt(decoded.joinedAt) : undefined,
            roles: decoded.roles ? new Collection(Object.values(decoded.roles).map((r) => {
                return [r.id, {
                    ...r,
                    icon: r.icon ? BigInt(r.icon) : undefined
                }]
            })) : undefined
        } as Guild
    } catch(_) {
        return undefined
    }
}

export async function guild_has(guildId: bigint) {
    const res = await fetch(`https://localhost:9493/guilds/has/${guildId}`)

    const data = await res.text();

    return data === "true"
}

export async function guild_delete(guildId: bigint) {
    await fetch(`https://localhost:9493/guilds/delete/${guildId}`, {
        method: 'POST'
    })
}

export async function get_guilds(): Promise<Array<Guild>> {
    const res = await fetch(`https://localhost:9493/guilds/get`, {
        method: 'GET',
    })

    const data = await res.arrayBuffer();

    return decode(new Uint8Array(data)) as Array<Guild>
}
