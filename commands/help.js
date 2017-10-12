const Command = require('../base/Command.js');

class Help extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'Displays all the available commands for your permission level.',
      usage: 'help [command]',
      aliases: ['h', 'halp']
    });
  }

  async run(message, args, level) {
    if (!args[0]) {
      var prefixes = '';
      let prefix = false;
      if(message.channel.type === "dm"){
        prefix = this.client.config.prefix;
      } else {
        prefixes = [this.client.config.prefix, this.client.settings.get(message.guild.id).prefix];
        for(const thisPrefix of prefixes) {
          if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }
      }
      var myCommands = message.guild ? this.client.commands.filter(cmd => cmd.conf.permLevel <= level && cmd.help.name !== "eval") : this.client.commands.filter(cmd => cmd.conf.permLevel <= level &&  cmd.conf.guildOnly !== true);
	  // const myCommands = message.guild ? this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level) : this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      let currentCategory = '';
      let output = `= Command List =\n\n[Use ${prefix}help <commandname> for details]\n`;
	  if(message.guild && this.client.settings.get(message.guild.id).prefix !== prefix){
		output += `Its suggested that you use ${this.client.settings.get(message.guild.id).prefix} in this server.\n`;
	  }
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\n== ${cat} ==\n`;
          currentCategory = cat;
        }
        output += `${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
      });
      message.channel.send(output, {code:'asciidoc',split:true});
    } else {
      let command = args[0];
      if (this.client.commands.has(command)) command = this.client.commands.get(command);
      else if (this.client.aliases.has(command)) command = this.client.commands.get(this.client.aliases.get(command));
      else return;
      if (level < command.conf.permLevel) return;
      message.channel.send(
`= ${command.help.name} = 
${command.help.description}
usage:: ${command.help.usage}
aliases:: ${command.conf.aliases.join(', ')}
category:: ${command.help.category}`, {code:'asciidoc'});
      }
  }
}
module.exports = Help;