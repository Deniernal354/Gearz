const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');

class Report extends Command {
  constructor(client) {
    super(client, {
      name: 'report',
      description: 'Report issues of the bot.',
      usage: 'report <issue title> <issue detail>',
	  category: 'Support'
    });
  }

  async run(message, [title, ...detail], level) { // eslint-disable-line no-unused-vars
  try{
	if(!title) return message.reply('You must give the title of the issue!');
	if(detail.length < 1) return message.reply('You must explain the issue a bit before it is accepted.');
	// doing the case number thing
	var caseNum;
	const messages = await this.client.guilds.get('358098380729221133').channels.get('358098934759161856').fetchMessages({limit: 5});
    const log = messages.filter(m => m.author.id === this.client.user.id && m.embeds[0] && m.embeds[0].type === 'rich' && m.embeds[0].footer && m.embeds[0].footer.text.startsWith('Issue')).first();
    if (!log) {
	  caseNum = 1;
	}else {
      const thisCase = /Issue\s(\d+)/.exec(log.embeds[0].footer.text);
      caseNum = thisCase ? parseInt(thisCase[1]) + 1 : 1;
	}
	const embed = new RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
	  .setColor(0xdc143c)
	  .setDescription(`**ID:** ${message.author.id}\n**Title:** ${title}\n**Description:** ${detail.join(' ')}`)
	  .setFooter(`Issue ${caseNum}`)
	  .setTimestamp()
	this.client.guilds.get('358098380729221133').channels.get('358098934759161856').send({embed}).catch(e => console.error(e));
	message.reply(`Thanks for reporting the Issue#${caseNum}.\nYou might recieve feedback soon regarding this Issue#${caseNum}(**${title}**).`);
  }catch (error) {console.log(error)}
  }
}
module.exports = Report;