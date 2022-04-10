import Bot from "./deps.ts";
import {channel_delete, channel_get, channel_has, channel_set} from "./channels.ts";
import {message_delete, message_get, message_has, message_set} from "./messages.ts";
import {guild_delete, guild_get, guild_has, guild_set} from "./guilds.ts";

export function useExternalCache(bot: Bot) {
    // @ts-ignore ;)
    bot.channels.get = channel_get;
    // @ts-ignore ;)
    bot.channels.set = channel_set;
    // @ts-ignore ;)
    bot.channels.has = channel_has;
    // @ts-ignore ;)
    bot.channels.delete = channel_delete;

    // @ts-ignore ;)
    bot.messages.get = message_get;
    // @ts-ignore ;)
    bot.messages.set = message_set;
    // @ts-ignore ;)
    bot.messages.has = message_has;
    // @ts-ignore ;)
    bot.messages.delete = message_delete;

    // @ts-ignore ;)
    bot.guilds.get = guild_get;
    // @ts-ignore ;)
    bot.guilds.set = guild_set;
    // @ts-ignore ;)
    bot.guilds.has = guild_has;
    // @ts-ignore ;)
    bot.guilds.delete = guild_delete;
}
