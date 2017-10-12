const Command = require('../base/Command.js');

class Notify extends Command {
  constructor(client) {
    super(client, {
      name: 'notify',
      description: 'Sends a announcement in the announcement channel',
      usage: 'notify <announcement>',
	  category: 'Bot Makers',
	  permLevel: 9
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
  try{
	let rolemention = '<@&358107764603486209>';
	let role = this.client.guilds.get('358098380729221133').roles.get('358107764603486209');
	await role.edit({ mentionable: true });
	this.client.guilds.get('358098380729221133').channels.get('358098732396314634').send(`${rolemention}, ${args.join(' ')}`)
	await role.edit({ mentionable: false });
  }catch (error) {console.log(error)}
  }
}
module.exports = Notify;