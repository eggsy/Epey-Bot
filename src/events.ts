import { Guild, Message, TextChannel } from "eris";
import { Command } from "./structures/Command";
import consola from "consola";

export function onReady() {
  consola.success(
    `Discord'a başarıyla ${this.user.username}#${this.user.discriminator} kullanıcısıyla bağlanıldı.`
  );
  this.editStatus("online", {
    name: "komutlarınızı",
    type: 2,
  });
}

export async function onMessage(message: Message) {
  if (message.channel.type !== 0 || message.author.bot) return;

  let effectivePrefix: number = 0;

  for (let prefix of this.prefixes) {
    if (message.content.startsWith(prefix)) {
      effectivePrefix = prefix.length;
    }
  }

  if (effectivePrefix == 0) return;

  const command: string = message.content
    .split(" ")[0]
    .substring(effectivePrefix);

  const args: string[] = message.content.split(" ").slice(1);

  if (this.commands.has(command)) {
    const channel: TextChannel = message.channel;
    const guild: Guild = channel.guild;

    const cmd: Command = this.commands.get(command);

    if (cmd.ownerOnly && message.author.id !== this.ownerId) return;

    cmd.execute({
      client: this,
      args: args,
      message: message,
      author: message.member,
      guild: guild,
      channel: channel,
      bot: this,
    });
  }
}
