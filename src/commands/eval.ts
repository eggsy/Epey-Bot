import { Command } from "../structures/Command";
import { Params } from "../../@types";
import { inspect } from "util";

export default class EvalCommand extends Command {
  name = "eval";
  desc = "Canlı kod test etmeye yarar.";
  ownerOnly = true;
  aliases = ["ev"];
  usage = "eval this";

  async execute(ctx: Params) {
    if (!ctx.args.length)
      return ctx.channel
        .createMessage(`:x: Çalıştırmak istediğiniz kodunu girin.`)
        .then((m) => setTimeout(() => m.delete(), 3000))
        .catch(null);

    const script = ctx.args.join(" ");
    const isAsync = script.includes("return") || script.includes("await");

    try {
      let result = eval(isAsync ? `(async()=>{${script}})();` : script);
      if ((result as any) instanceof Promise) result = await result;

      result = inspect(result, { depth: 0 }).substring(0, 1900);
      result = result.replace(ctx.bot.token, "***");

      return ctx.channel.createMessage(
        ":white_check_mark: **Çıktı:** ```js\n" + result + "```"
      );
    } catch (error) {
      return ctx.channel
        .createMessage(":x: **Hata:** ```js\n" + error + "```")
        .catch(null);
    }
  }
}
