const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');

class Suggest extends Command {
  constructor(client) {
    super(client, {
      name: 'suggest',
      description: 'Suggest something regarding the bot.',
      usage: 'suggest <suggestion title> <suggestion detail>',
	  category: 'Support'
    });
  }

  async run(message, [title, ...detail], level) { // eslint-disable-line no-unused-vars
  try{
	if(!title) return message.reply('You must give the title of the suggestion!');
	if(detail.length < 1) return message.reply('You must explain your suggestion a bit before it is accepted.');
	// doing the case number thing
	var caseNum;
	const messages = await this.client.guilds.get('358098380729221133').channels.get('366879051526307850').fetchMessages({limit: 5});
    const log = messages.filter(m => m.author.id === this.client.user.id && m.embeds[0] && m.embeds[0].type === 'rich' && m.embeds[0].footer && m.embeds[0].footer.text.startsWith('Suggestion')).first();
    if (!log) {
	  caseNum = 1;
	}else {
      const thisCase = /Suggestion\s(\d+)/.exec(log.embeds[0].footer.text);
      caseNum = thisCase ? parseInt(thisCase[1]) + 1 : 1;
	}
	const embed = new RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
	  .setColor(0xffd700)
	  .setDescription(`**ID:** ${message.author.id}\n**Title:** ${title}\n**Description:** ${detail.join(' ')}`)
	  .setFooter(`Suggestion ${caseNum}`)
	  .setTimestamp()
	this.client.guilds.get('358098380729221133').channels.get('366879051526307850').send({embed}).catch(e => console.error(e));
	message.reply(`Thanks for the suggestion#${caseNum}.\nYou might recieve feedback soon regarding this suggestion#${caseNum}(**${title}**).`);
  }catch (error) {console.log(error)}
  }
}
module.exports = Suggest;