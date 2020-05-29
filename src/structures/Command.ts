import { Client, Guild, Member, Message, TextChannel } from "eris";
import { EpeyBot } from "../index";

export abstract class Command {
  abstract name: string;
  abstract desc: string;
  abstract usage: string;
  aliases: string[] = [];
  ownerOnly: boolean = false;
  abstract async execute(args: Params);
}

export interface Params {
  client: Client;
  args: string[];
  message: Message;
  author: Member;
  guild: Guild;
  channel: TextChannel;
  bot: EpeyBot;
}
