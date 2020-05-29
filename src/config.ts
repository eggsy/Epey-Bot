export class Config {
  token: string = process.env.TOKEN;
  id: string = "715686815729975380";
  ownerId: string = process.env.ownerId || "162969778699501569";
  prefixes: Array<string> = ["e!"];
  name: string = "Epey Bot";
  desc: string = "Discord sunucuzdan epey.com verilerine erişin";
}
