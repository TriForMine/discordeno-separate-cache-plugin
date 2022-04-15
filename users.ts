import {Collection} from "../deps.ts";
import {User} from "../deps.ts";
import {decode, encode} from "./cache.ts";

export async function override_users(users: Collection<bigint, User>) {
    return await fetch(`https://localhost:9493/users/set`, {
        method: 'POST',
        body: encode(new Map(users))
    })
}

export async function user_set(userId: bigint, user: User) {
    try {
        const c = {
            ...user,
            avatar: user.avatar?.toString(),
        }

        return await fetch(`https://localhost:9493/users/set/${userId}`, {
            method: 'POST',
            body: encode(c)
        })
    } catch (err) {
        return undefined
    }
}

export async function user_size() {
    try {
        const res = await fetch(`https://localhost:9493/users/size`)

        const data = await res.arrayBuffer();
        return decode(new Uint8Array(data)) as number
    } catch (_) {
        return 0
    }
}

export async function user_get(userId: bigint) {
    try {
        const res = await fetch(`https://localhost:9493/users/get/${userId}`)

        const data = await res.arrayBuffer();

        const decoded = decode(new Uint8Array(data));
        return {
            ...decoded,
            avatar: decoded.avatar ? BigInt(decoded.avatar) : undefined
        } as User
    } catch (_) {
        return undefined
    }
}

export async function user_has(userId: bigint) {
    const res = await fetch(`https://localhost:9493/users/has/${userId}`)

    const data = await res.text();

    return data === "true"
}

export async function user_delete(userId: bigint) {
    await fetch(`https://localhost:9493/users/delete/${userId}`, {
        method: 'POST'
    })
}

export async function get_users(): Promise<Array<User>> {
    const res = await fetch(`https://localhost:9493/users/get`, {
        method: 'GET',
    })

    const data = await res.arrayBuffer();

    return decode(new Uint8Array(data)) as Array<User>
}
