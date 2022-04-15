import type Bot from "./deps.ts";
import {channel_delete, channel_get, channel_has, channel_set, channel_size} from "./channels.ts";
import {message_delete, message_get, message_has, message_set, message_size} from "./messages.ts";
import {guild_delete, guild_get, guild_has, guild_set, guild_size} from "./guilds.ts";
import {user_delete, user_get, user_has, user_set, user_size} from "./users.ts";
import {member_delete, member_get, member_has, member_set, member_size} from "./members.ts";

export function useExternalCache(bot: Bot) {
    // @ts-ignore ;)
    bot.channels.get = channel_get;
    // @ts-ignore ;)
    bot.channels.set = channel_set;
    // @ts-ignore ;)
    bot.channels.has = channel_has;
    // @ts-ignore ;)
    bot.channels.delete = channel_delete;

    Object.defineProperty(bot.channels, "size", {
        get: async () => {
            return await channel_size()
        }
    })

    // @ts-ignore ;)
    bot.messages.get = message_get;
    // @ts-ignore ;)
    bot.messages.set = message_set;
    // @ts-ignore ;)
    bot.messages.has = message_has;
    // @ts-ignore ;)
    bot.messages.delete = message_delete;

    Object.defineProperty(bot.messages, "size", {
        get: async () => {
            return await message_size()
        }
    })

    // @ts-ignore ;)
    bot.guilds.get = guild_get;
    // @ts-ignore ;)
    bot.guilds.set = guild_set;
    // @ts-ignore ;)
    bot.guilds.has = guild_has;
    // @ts-ignore ;)
    bot.guilds.delete = guild_delete;

    Object.defineProperty(bot.guilds, "size", {
        get: async () => {
            return await guild_size()
        }
    })

    // @ts-ignore ;)
    bot.users.get = user_get;
    // @ts-ignore ;)
    bot.users.set = user_set;
    // @ts-ignore ;)
    bot.users.has = user_has;
    // @ts-ignore ;)
    bot.users.delete = user_delete;

    Object.defineProperty(bot.users, "size", {
        get: async () => {
            return await user_size()
        }
    })

    // @ts-ignore ;)
    bot.members.get = member_get;
    // @ts-ignore ;)
    bot.members.set = member_set;
    // @ts-ignore ;)
    bot.members.has = member_has;
    // @ts-ignore ;)
    bot.members.delete = member_delete;

    Object.defineProperty(bot.members, "size", {
        get: async () => {
            return await member_size()
        }
    })
}
