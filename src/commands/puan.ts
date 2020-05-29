import { Command, Params } from "../structures/Command";
import { Embed } from "eris";
import Scraper from "webscrape";

export default class PuanCommand extends Command {
  name: string = "puan";
  desc: string = "Belirtilen ürünün epey.com puanını gösterir.";
  aliases: string[] = ["p"];
  usage: string = "puan <ürün>";

  async execute(ctx: Params) {
    if (!ctx.args.length)
      return ctx.channel.createMessage(
        ":no_entry_sign: Lütfen bir URL belirttiğinize emin olun. Bu bot şimdilik sadece karmaşık URL'ler ile çalışmaktadır; örnek bir URL: `akilli-telefonlar/samsung-galaxy-s20-ultra`"
      );

    let url: string = ctx.args.join(" ").replace(".html", "");
    url.startsWith("/") ? (url = url.slice(1)) : false;

    try {
      if (url.includes("https://") && url.includes("epey.com")) {
        let link = new URL(url);
        url = link.pathname.replace(".html", "");
      }

      ctx.channel.sendTyping();

      let result = await Scraper().get(`https://www.epey.com/${url}.html`),
        product = result.$(".baslik h1 a")?.text(),
        productExtra = result.$(".baslik h1 a span")?.text(),
        rating = result.$("#puan")?.[0]?.attribs?.["data-percent"];

      productExtra
        ? (product = product.replace(` ${productExtra}`, ""))
        : false;

      // TODO: Add image of rating circle-bar here.
      const embed: Embed = {
        type: "embed",
        color: 0xd96140,
        author: {
          name: product || "Bilinmeyen",
          url: `https://www.epey.com/${url}.html`,
        },
        description: `Bu ürün hakkında [daha fazla bilgi](https://www.epey.com/${url}.html).`,
        footer: {
          text: `Puan: ${rating}/100 - epey.com ile herhangi bir bağı yoktur.`,
        },
      };

      ctx.channel.createMessage({ embed }).catch(null);
    } catch (err) {
      ctx.channel
        .createMessage(
          ":no_entry_sign: Bir hata oluştu. Lütfen başka bir ürünle veya daha sonra tekrar deneyin."
        )
        .catch(null);

      ctx.channel.sendTyping();
    }
  }
}
