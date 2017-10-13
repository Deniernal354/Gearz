const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');

class Urban extends Command {
  constructor(client) {
    super(client, {
      name: 'urban',
      description: 'Searches the Urban Dictionary library for a definition to the search term.',
      usage: 'urban <term>',
      aliases: ['ud']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
  try{
    if(args.length < 1) return message.reply('You must mention some term to search for');
    const { body } = await snekfetch.get(`http://api.urbandictionary.com/v0/define?term=${args.join(' ')}`);
    let description = (body.result_type === "no_results") ? "No data found" : body.list[0].definition
    if(body.result_type !== "no_results") description += `\n\n**❯ Example** : ${body.list[0].example}\n\n**❯ ThumbsUP** : ${body.list[0].thumbs_up}\n**❯ ThumbsDown** : ${body.list[0].thumbs_down}`
    const embed = new RichEmbed()        
        .setColor(0x1e90ff)
        .setDescription(description)
        .setThumbnail('https://i.imgur.com/ressY86.png')
        if(body.result_type !== "no_results"){
            embed.setTitle(body.list[0].word)
            .setURL(`${body.list[0].permalink}`)
            .setFooter(`Author: ${body.list[0].author}`)    
        }
    message.channel.send({embed}).catch(e => console.error(e));
  }catch(error) {console.log(error)}
  }
}
module.exports = Urban;
