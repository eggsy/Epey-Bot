import { Params } from "../../@types";

export abstract class Command {
  abstract name: string;
  abstract desc: string;
  abstract usage: string;
  aliases: string[] = [];
  ownerOnly: boolean = false;
  abstract async execute(args: Params);
}