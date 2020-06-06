import { Command, Params } from "../structures/Command";
import { Embed } from "eris";

export default class HelpCommand extends Command {
  name: string = "yardım";
  desc: string = "Komutlar ve botun işlevi hakkında bilgi gösterir.";
  aliases: string[] = ["help", "y"];
  usage: string = "yardım <komut>";

  async execute(ctx: Params) {
    if (!ctx.args?.length) {
      let message = "",
        added = [];

      ctx.bot.commands.forEach((command: Command) => {
        if (
          added.includes(command.name) ||
          (command.ownerOnly && ctx.author.id !== ctx.bot.ownerId)
        )
          return;

        message += `\`${command.name}\`: ${command.desc}\n`;
        added.push(command.name);
      });

      const embed: Embed = {
        type: "embed",
        color: 0xd96140,
        author: {
          name: "Epey Discord Bot",
          icon_url: ctx.bot.user.avatarURL,
        },
        description: "Discord sunucunuzdan epey.com verilerine erişin!",
        fields: [
          {
            name: "Komutlar",
            value: message,
          },
          {
            name: "Daha fazla bilgi",
            value:
              "Herhangi bir komut hakkında yardım almak için: `e!yardım <komut>`",
          },
        ],
        footer: {
          text: "epey.com ile herhangi bir bağı yoktur.",
        },
      };

      ctx.channel.createMessage({ embed }).catch(null);
    } else if (ctx.args?.length && ctx.bot.commands.has(ctx.args?.[0])) {
      const command: Command = ctx.bot.commands.get(ctx.args?.[0]),
        embed: Embed = {
          type: "embed",
          color: 0xd96140,
          description: `\`${command.name}\` komutu hakkında daha fazla bilgi.`,
          fields: [
            {
              name: "Açıklama",
              value: command.desc,
            },
            {
              name: "Kullanım",
              value: command.usage,
              inline: true,
            },
            {
              name: "Alternatifler",
              value: command.aliases.join(", "),
              inline: true,
            },
          ],
          footer: {
            text: "epey.com ile herhangi bir bağı yoktur.",
          },
        };

      ctx.channel.createMessage({ embed }).catch(null);
    }
  }
}
