import { Command } from "../structures/Command";
import { Params } from "../../@types";

export default class YenileCommand extends Command {
  name = "yenile";
  desc = "Bir komutu yeniler.";
  ownerOnly = true;
  usage = "yenile <komut>";

  execute(ctx: Params) {
    if (!ctx.args.length)
      return ctx.channel.createMessage(
        `${ctx.bot.emojis.get(
          "yok"
        )} Yenilemek istediğiniz komutun ismini girmelisiniz.`
      );

    const success: string[] = [];
    ctx.args.forEach((arg: string) => {
      if (ctx.bot.commands.has(arg)) ctx.bot.commands.delete(arg);
      let result = ctx.bot.reloadCommand(arg);
      result ? success.push(arg) : false;
    });

    if (!success.length)
      return ctx.channel.createMessage(
        `${ctx.bot.emojis.get(
          "yok"
        )} Belirttiğiniz komutlardan hiçbiri yeniden başlatılamadı. Lütfen konsolunuzu kontrol edin.`
      );
    else
      return ctx.channel.createMessage(
        `${ctx.bot.emojis.get(
          "var"
        )} Şu komutlar başarıyla yeniden başlatıldı: ${ctx.args
          .map((a) => `\`${a}\``)
          .join(", ")}`
      );
  }
}
