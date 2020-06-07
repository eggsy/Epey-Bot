import { Command, Params } from "../structures/Command";
import { Embed } from "eris";
import Scraper from "webscrape";
import consola from "consola";

export default class BilgiCommand extends Command {
  name: string = "bilgi";
  desc: string = "Belirtilen ürünün epey.com bilgisini gösterir.";
  aliases: string[] = ["info", "b"];
  usage: string = "bilgi <ürün>";

  async execute(ctx: Params) {
    if (!ctx.args.length)
      return ctx.channel.createMessage(
        ":no_entry_sign: Lütfen bir URL belirttiğinize emin olun. Bu bot şimdilik sadece karmaşık URL'ler ile çalışmaktadır; örnek bir URL: `akilli-telefonlar/samsung-galaxy-s20-ultra`"
      );

    const url = this.smartSearch(ctx.args);

    try {
      ctx.channel.sendTyping();

      let result = await Scraper().get(`https://www.epey.com/${url}.html`),
        product = result.$(".baslik h1 a")?.text(),
        productExtra = result.$(".baslik h1 a span")?.text(),
        image = result.$(".buyuk.row div.galerim.cell:first-child a img")?.[0]
          ?.attribs?.src,
        titles = result.$("#oncelikli.row .cell .row1")?.text(),
        values = result.$("#oncelikli.row .cell .row2")?.text(),
        price = result.$(".fiyat > *:not(.onsira) .urun_fiyat")?.[0]
          ?.children?.[0]?.data,
        rating = result.$("#puan")?.[0]?.attribs?.["data-percent"];

      productExtra
        ? (product = product.replace(` ${productExtra}`, ""))
        : false;

      const embed: Embed = {
        type: "embed",
        color: 0xd96140,
        description: `\`${product}\` adlı ürün hakkında [daha fazla bilgi](https://www.epey.com/${url}.html).`,
        fields: [],
        thumbnail: {
          url: image,
        },
        footer: {
          text: `${
            rating ? `Puan: ${rating}/100 - ` : ""
          }epey.com ile herhangi bir bağı yoktur.`,
        },
      };

      let splitted: { titles: string[]; values: string[] } = {
        titles: titles.split(":"),
        values: values.split("\n"),
      };

      for (let item in titles?.split(":")?.slice(0, -1)) {
        embed.fields.push({
          name: splitted.titles[item] || "Bilinmiyor",
          value:
            splitted.values[item] === " Var" || splitted.values[item] === " Yok"
              ? `${ctx.bot.emojis.get(
                  splitted.values[item].toLowerCase().substring(1)
                )} ${splitted.values[item]}`
              : splitted.values[item] || "Bilinmiyor",
          inline: true,
        });
      }

      embed.fields.push({
        name: "En Ucuz Fiyat",
        value: price || "Bilinmiyor",
        inline: embed.fields.length % 3 === 0 ? false : true,
      });

      ctx.channel.createMessage({ embed });
      ctx.channel.sendTyping();
    } catch (err) {
      ctx.channel
        .createMessage(
          ":no_entry_sign: Bir hata oluştu. Lütfen başka bir ürünle veya daha sonra tekrar deneyin."
        )
        .catch(null);

      ctx.channel.sendTyping();
    }
  }

  smartSearch(args): string | boolean {
    if (!args || !args.length) return null;

    const url = args.join("").replace(".html", "");
    if (url.includes("https://") && url.includes("epey.com")) {
      try {
        const link = new URL(url).pathname.replace(".html", "");
        return link.startsWith("/") ? link.slice(1) : link;
      } catch (err) {
        consola.error(err);
        return false;
      }
    }

    const normalizedTag = args
      .join("-")
      .replace(/ı/g, "i")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return normalizedTag;
  }
}
