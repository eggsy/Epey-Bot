import { config as loadEnv } from "dotenv";
import { Config } from "./config";
import { Client } from "eris";
import { readdirSync } from "fs";
import { onReady, onMessage, onError } from "./events";
import { Command } from "./structures/Command";
import { print as log } from "terminal-bigtext-generator";
import consola from "consola";

// .env dosyasını yükle.
loadEnv({ path: "../.env" });

export class EpeyBot extends Client {
  name: string;
  desc: string;
  ownerId: string;
  commands: Map<string, Command> = new Map();
  prefixes: Array<string>;
  emojis: Map<string, string>;
  private commandCount: number = 0;

  constructor(config: Config) {
    super(config.token);

    this.name = config.name;
    this.desc = config.desc;
    this.ownerId = config.ownerId;
    this.emojis = config.emojis;

    config.prefixes.push(`<@${config.id}> `);
    config.prefixes.push(`<@!${config.id}> `);
    this.prefixes = config.prefixes;

    this.run();
  }

  async run() {
    log("EPEY BOT");
    consola.info(
      `Bu bot tamamiyle açık kaynak bir bottur, daha fazla ayrıntı için eggsydev kullanıcısının depolarını inceleyin`
    );
    consola.info(
      `Bu botun epey.com ile herhangi bir bağı bulunmamaktadır. Kaynak kodları açıktır ve düzenlenebilir.`
    );

    this.loadCommands();
    this.on("ready", onReady);
    this.on("messageCreate", onMessage);
    this.on("error", onError);

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

        const command: Command = new (require(`./commands/${name}`).default)();
        this.commands.set(command.name, command);

        for (let alias of command.aliases) {
          this.commands.set(alias, command);
        }

        this.commandCount++;
      });

      consola.info(`${this.commandCount} adet komut yüklendi.`);
    } catch (err) {
      return consola.error(err);
    }
  }

  reloadCommand(name: string) {
    try {
      const command: Command = new (require(`./commands/${name}`).default)();
      this.commands.set(command.name, command);

      for (let alias of command.aliases) {
        this.commands.set(alias, command);
      }

      return true;
    } catch (err) {
      consola.error(err);
      return false;
    }
  }
}

new EpeyBot(new Config());
