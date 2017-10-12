const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

class Feedback extends Command {
  constructor(client) {
    super(client, {
      name: 'feedback',
      description: 'Post a feedback on a suggestion or a issue reported.',
      usage: 'feedback <channel> <case Number> <feedback>',
	  category: 'Bot Makers',
	  permLevel: 9,
	  guildOnly: true
    });
  }

  async run(message, [channel, caseNum, ...feeddata], level) { // eslint-disable-line no-unused-vars
  try{
	if(message.mentions.channels.size < 1) return message.reply('You must mention a channel where the case feedback is to be done');
	const messages = await message.mentions.channels.first().fetchMessages({limit: 100});
	const caseLog = await messages.find(m => m.embeds[0] && m.embeds[0].footer && (m.embeds[0].footer.text === `Suggestion ${caseNum}` || m.embeds[0].footer.text === `Issue ${caseNum}`));
	if(!caseLog) return message.reply('Pls provide proper details for the case');
	const logMsg = await message.mentions.channels.first().fetchMessage(caseLog.id);
	const logEmbed    =  logMsg.embeds[0];
	const embed = new RichEmbed()
	  .setAuthor(message.author.username, message.author.avatarURL)
	  .setColor(logEmbed.color)
	  .setDescription(logEmbed.description)
	  .addField('Reported at', moment(logMsg.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a'))
	  .addField('Reported by', logEmbed.author.name)
	  .addField('Feedback', feeddata.join(' '))
	  .setFooter(logEmbed.footer.text)
	  .setTimestamp()
	await logMsg.edit({embed});
	let splittingForId1 = logEmbed.description.split('**ID:** '),
		idObtained = splittingForId1[1].split('\n**Title:**');
	const fbPerson = this.client.users.get(idObtained[0]);
	if(!fbPerson){
		message.channel.send(`The person with ID ${idObtained[0]} no longer shares a server with me.`);
	}else{
		embed.addField('Message from the bot developers', 'We are very thankful that you are helping us to improve the bot.\nWe have reviewed what you had reported to us. And we hope that this clarifies things.\n**THANK YOU**')
		fbPerson.send({embed}).catch(e => console.error(e));
	}
	message.reply('Feedback is completed');
  }catch (error) {console.log(error)}
  }
}
module.exports = Feedback;