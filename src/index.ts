import { config } from "dotenv";
import { Config } from "./config";
import { Client } from "eris";
import { readdirSync } from "fs";
import { onReady, onMessage } from "./events";
import { Command } from "./structures/Command";
import { print as log } from "terminal-bigtext-generator";

// .env dosyasını yükle.
config();

export class EpeyBot extends Client {
  name: string;
  desc: string;
  ownerId: string;
  commands: Map<string, Command> = new Map();
  prefixes: Array<string>;

  constructor(config: Config) {
    super(config.token);

    this.name = config.name;
    this.desc = config.desc;
    this.ownerId = config.ownerId;

    config.prefixes.push(`<@${config.id}> `);
    this.prefixes = config.prefixes;
    this.run();
  }

  async run() {
    log("EPEY BOT");
    console.log(
      `[BİLGİ] Bu bot tamamiyle açık kaynak bir bottur, daha fazla ayrıntı için eggsywashere kullanıcısının depolarını inceleyin`,
      `\n[BİLGİ] Bu botun epey.com ile herhangi bir bağı bulunmamaktadır. Kaynak kodları açıktır ve düzenlenebilir.`
    );

    this.loadCommands();
    this.on("ready", onReady);
    this.on("messageCreate", onMessage);

    await this.connect();
  }

  async reload() {
    this.disconnect({ reconnect: false });
    this.commands.clear();
    await this.run();
  }

  shutdown() {
    this.disconnect({ reconnect: false });
    process.exit(0);
  }

  loadCommands() {
    try {
      const files = readdirSync(__dirname + "/commands");

      files.forEach((name: string) => {
        if (name.endsWith(".map")) return;

        let command: Command = new (require(`./commands/${name}`).default)();
        this.commands.set(command.name, command);

        for (let alias of command.aliases) {
          this.commands.set(alias, command);
        }
      });
    } catch (err) {
      return console.error(err.message);
    }
  }
}

new EpeyBot(new Config());
