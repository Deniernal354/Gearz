module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(message) {
    try{
    // not executing if message is by any other bot
    if (message.author.bot) return;
	
    // return if the user is blacklisted globallly
    const blacklist = this.client.blacklist.get('list');
    if (blacklist.includes(message.author.id)) return;

    // getting the setting
    const settings = message.guild ? this.client.settings.get(message.guild.id) : this.client.config.defaultSettings;
	if(settings.antiInvite === "true" && this.client.permLvl(message) > 0){
	  if (/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)) {
        message.delete();
        message.reply('Sending invite links are totally prohibited');
	  }
	}
	/*
    // not executing if the user is blacklisted in the server
    if(message.channel.type === "text"){
      const BlistServer = this.client.settings.get(message.guild.id).uBlacklist;
      for(let i = 0; i < BlistServer.length; i++){
        if(BlistServer[i].includes(message.author.id)) return;
      }
    }*/

    // calculating level of the user
    const level = this.client.permLvl(message);

    // checking for direct bot mention
    if (message.content.match(new RegExp(`^<@!?${this.client.user.id}>$`))) {
      let mentionMsg = '';
      mentionMsg = `The prefix here is \`${settings.prefix}\`.`;
      if(settings.prefix !== this.client.config.prefix){
        mentionMsg += `\nAlso the prefix I accept everywhere i.e. even in DM is \`${this.client.config.prefix}\`.`
      }
      return message.channel.send(mentionMsg);
    }

    //getting the prefix
    var prefixes = '';
    let prefix = false;
    if(message.channel.type === "dm"){
      prefix = this.client.config.prefix;
    }
    else {
      prefixes = [this.client.config.prefix, settings.prefix];
      for(const thisPrefix of prefixes) {
        if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
      }
    }
    if(!prefix) return;
    if(!message.content.startsWith(prefix)) return;

    // main things here
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
    if (cmd && level >= cmd.conf.permLevel) {
      // checking if guild or DM and checking if has perms
      if(message.guild){
        if(!message.member.hasPermission(cmd.conf.userPermNeeded, false, true)) return;
      }
      message.flags = [];
      while (args[0] && args[0][0] === '-') {
        message.flags.push(args.shift().slice(1));
      }
      this.client.log('log', `${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, 'CMD');
      //checking if bot has the needed permissions or not
      if (message.channel.type === 'text') { 
        const mPerms = message.guild.member(this.client.user).hasPermission(cmd.conf.botPermNeeded);
        if (!mPerms) return message.channel.send(`The bot does not have the required permissions to run this command`);
      }
      cmd.run(message, args, level).catch(error => {
        message.channel.send(error);
      });
    }
  }catch(error) {console.log(error)}
  }
};