import {Collection} from "../deps.ts";
import {Message} from "../deps.ts";
import {decode, encode} from "./cache.ts";

export async function override_messages(messages: Collection<bigint, Message>) {
    return await fetch(`https://localhost:9493/messages/set`, {
        method: 'POST',
        body: encode(new Map(messages))
    })
}

export async function message_set(messageId: bigint, message: Message) {
    try {
        const c = {
            ...message,
            timestamp: message.timestamp?.toString(),
            editedTimestamp: message.editedTimestamp?.toString(),
            embeds: message.embeds?.map((embed) => {
                return {
                    ...embed,
                    timestamp: embed.timestamp?.toString()
                }
            })
        }

        return await fetch(`https://localhost:9493/messages/set/${messageId}`, {
            method: 'POST',
            body: encode(c)
        })
    } catch (_) {
        return undefined
    }
}

export async function message_size() {
    try {
        const res = await fetch(`https://localhost:9493/messages/size`)

        const data = await res.arrayBuffer();
        return decode(new Uint8Array(data)) as number
    } catch (_) {
        return 0
    }
}

export async function message_get(messageId: bigint) {
    try {
        const res = await fetch(`https://localhost:9493/messages/get/${messageId}`)

        const data = await res.arrayBuffer();

        const decoded = decode(new Uint8Array(data));
        return decoded as Message
    } catch (_) {
        return undefined
    }
}

export async function message_has(messageId: bigint) {
    const res = await fetch(`https://localhost:9493/messages/has/${messageId}`)

    const data = await res.text();

    return data === "true"
}

export async function message_delete(messageId: bigint) {
    await fetch(`https://localhost:9493/messages/delete/${messageId}`, {
        method: 'POST'
    })
}

export async function get_messages(): Promise<Array<Message>> {
    const res = await fetch(`https://localhost:9493/messages/get`, {
        method: 'GET',
    })

    const data = await res.arrayBuffer();

    return decode(new Uint8Array(data)) as Array<Message>
}
