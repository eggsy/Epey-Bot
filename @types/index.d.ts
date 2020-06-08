import { Client, Guild, Member, Message, TextChannel } from "eris";
import { EpeyBot } from "../src/index";

interface Params {
  client: Client;
  args: string[];
  message: Message;
  author: Member;
  guild: Guild;
  channel: TextChannel;
  bot: EpeyBot;
}