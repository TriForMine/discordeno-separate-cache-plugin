import {Collection} from "../deps.ts";
import {Member} from "../deps.ts";
import {decode, encode} from "./cache.ts";

export async function override_members(members: Collection<bigint, Member>) {
    return await fetch(`https://localhost:9493/members/set`, {
        method: 'POST',
        body: encode(new Map(members))
    })
}

export async function member_set(memberId: bigint, member: Member) {
    try {
        const c = {
            ...member,
            cachedAt: member.cachedAt?.toString()
        }

        return await fetch(`https://localhost:9493/members/set/${memberId}`, {
            method: 'POST',
            body: encode(c)
        })
    } catch (err) {
        return undefined
    }
}

export async function member_size() {
    try {
        const res = await fetch(`https://localhost:9493/members/size`)

        const data = await res.arrayBuffer();
        return decode(new Uint8Array(data)) as number
    } catch (_) {
        return 0
    }
}

export async function member_get(memberId: bigint) {
    try {
        const res = await fetch(`https://localhost:9493/members/get/${memberId}`)

        const data = await res.arrayBuffer();

        const decoded = decode(new Uint8Array(data));
        return {
            ...decoded,
            cachedAt: decoded.cachedAt ? parseInt(decoded.cachedAt) : undefined
        } as Member
    } catch (_) {
        return undefined
    }
}

export async function member_has(memberId: bigint) {
    const res = await fetch(`https://localhost:9493/members/has/${memberId}`)

    const data = await res.text();

    return data === "true"
}

export async function member_delete(memberId: bigint) {
    await fetch(`https://localhost:9493/members/delete/${memberId}`, {
        method: 'POST'
    })
}

export async function get_members(): Promise<Array<Member>> {
    const res = await fetch(`https://localhost:9493/members/get`, {
        method: 'GET',
    })

    const data = await res.arrayBuffer();

    return decode(new Uint8Array(data)) as Array<Member>
}
