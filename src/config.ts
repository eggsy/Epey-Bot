export class Config {
  token: string = process.env.TOKEN;
  id: string = process.env.CLIENT_ID;
  ownerId: string = process.env.OWNER_ID;
  prefixes: string[] = ["e!", "e."];
  name: string = "Epey Bot";
  desc: string = "Discord sunucuzdan epey.com verilerine erişin";
  emojis: Map<string, string> = new Map([
    ["var", "<:var:716801006863908959>"],
    ["yok", "<:yok:716801006863777965>"],
  ]);
}
