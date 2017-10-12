const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');

class Info extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      description: 'General info about the Bot.',
      usage: 'ping',
      aliases: ['botInfo']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
	this.client.guilds.get('358098380729221133').channels.get('358098700175802370').createInvite({maxAge:0}).then(invite => {
		const embed = new RichEmbed()
			.setColor(0x4169e1)
			.setAuthor(this.client.user.username, this.client.user.avatarURL)
			.setDescription('Hello Everyone :wave:, This bot is my very first attempt with discord.js bot making.\nI made this with the main objective to provide fun to the users of this bot.\nI hope you like this bot. **~Bot Owner**')
			.addField('Invite Bot', 'Are you planning to add this bot over to your cool server ?\n**Click [here](https://discordapp.com/oauth2/authorize/?permissions=2146958591&scope=bot&client_id=367202192609902593) to do so.**')
			.addField('Join Server', `Do you want to be in the official server of this bot ?\n**Click [here](${invite.url}) to do so.**`)
		message.channel.send({embed});
	});
  }
}

module.exports = Info;