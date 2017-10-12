const Command = require('../base/Command.js');
const { inspect } = require('util');

class Setting extends Command {
  constructor(client) {
    super(client, {
      name: 'setting',
      description: 'View or change settings for your server.',
      category: 'Server',
      usage: 'setting <view/edit> <key> <value>',
      extended: 'This command is designed to change per-server-configurations for the guild the command was issued on.',
      guildOnly: true,
      aliases: ['set', 'settings', 'conf'],
      permLevel: 5
    });
  }

  async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars
      try{
    const settings = this.client.settings.get(message.guild.id);
    // Getting proper name from the id
    let chan = message.guild.channels.get(settings.logChannel);
    let logchname = chan ? chan.name : "None";
    let rol = message.guild.roles.get(settings.autoRole);
    let autrolname = rol ? rol.name : "None";

    // Getting the server setting data
    let tprefix = settings.prefix,
		tantiInvite = settings.antiInvite,
        tuserLog = settings.userLog ? settings.userLog : "False",
        tlogChannel = logchname,
        tmodLog = settings.modLog ? settings.modLog : "None",
        tautoRole =autrolname,
        tjoinMsg = settings.joinMsg ? settings.joinMsg : "No custom join message",
        tleaveMsg = settings.leaveMsg ? settings.leaveMsg : "No custom leave message",
        tdCommands = settings.dCommands.filter(c => c !== "None").join(', ') ? settings.dCommands.filter(c => c !== "None").join(', ') : "None",
        tuBlacklist = settings.uBlacklist.filter(c => c !== "None").join(', ') ? settings.uBlacklist.filter(c => c !== "None").join(', ') : "None",
        tdChannels = settings.dChannels.filter(c => c !== "None").join(', ') ? settings.dChannels.filter(c => c !== "None").join(', ') : "None",
        tuserLogType;
    if(settings.userLogType == "0"){
      tuserLogType = "0 - Disabled"
    } else if(settings.userLogType == "1"){
      tuserLogType = "1 - Simple text"
    } else if(settings.userLogType == "2"){
      tuserLogType = "2 - Embed text"
    } else if(settings.userLogType == "3"){
      tuserLogType = "3 - Image"
    }

    
    if(!action || action === "view"){

      //the content of the message
      message.channel.send(`
prefix       :: ${tprefix}
antiInvite   :: ${tantiInvite}
userLog      :: ${tuserLog}
logChannel   :: ${tlogChannel}
userLogType  :: ${tuserLogType}
autoRole     :: ${tautoRole}
joinMsg      :: ${tjoinMsg}
leaveMsg     :: ${tleaveMsg}`, {code: 'asciidoc'})
    } else if(action === "edit") {
      if (!key || !value) return message.reply('You must enter both the key and value to be edited.');
      if (value.length < 1) return message.reply('Please specify a new value');
      if (!settings[key]) return message.reply(`This key, ${key} does not exist in the settings`); 

      // various checks for various commands
      if(key.toLowerCase() === "dcommands"){
        return //message.channel.send(`This setting cant be edited from here, Use the \`${settings.prefix}dcommand\` to disable/enable a command.`)
      }else if(key.toLowerCase() === "ublacklist"){
        return //message.channel.send(`This setting cant be edited from here, Use the \`${settings.prefix}blacklist\` to add/remove a user from the server blacklist from using mine commands.`)
      }else if(key.toLowerCase() === "dchannels"){
        return //message.channel.send(`This setting cant be edited from here, Use the \`${settings.prefix}ignoreCh\` to add/remove a user from the server blacklist from using mine commands.`)
      }else if(key.toLowerCase() === "modlog"){
		return
	  }else if(key.toLowerCase() === "userlog"){
        if(value.join(' ').toLowerCase().includes("true") || value.includes("false")) {console.log('ok it includes true of false')}
		else{
		  return message.channel.send('**UserLog** can be set to true or false only.')
		}
      }else if(key.toLowerCase() === "antiinvite"){
        if(value.join(' ').toLowerCase().includes("true") || value.includes("false")) {console.log('ok it includes true of false')}
		else{
		  return message.channel.send('**antiInvite** can be set to true or false only.')
		}
      }else if(key.toLowerCase() === "userlogtype"){
        if(!parseInt(value)) return message.reply('Value must a integer between 0-3')        
        else if(parseInt(value) > 3 || parseInt(value) < 1) {
          message.reply('The value must be between 1-3\nIts being set to 1 as default for now.')
          settings[key] = "1";
          this.client.settings.set(message.guild.id, settings);
          message.channel.send(`${key} successfully edited to \`0\``);
          return;
        }
        settings[key] = parseInt(value);
        this.client.settings.set(message.guild.id, settings);
        message.channel.send(`${key} successfully edited to \`${parseInt(value)}\``);
        return;
      }else if(key.toLowerCase() === "logchannel"){
        if(!message.mentions.channels.first()) return message.reply('You must mention a channel.')
        settings[key] = message.mentions.channels.first().id;
        this.client.settings.set(message.guild.id, settings);
        message.channel.send(`${key} successfully edited to \`${message.mentions.channels.first().name}\``);
        return;
      }else if(key.toLowerCase() === "autorole"){
        if(!message.mentions.roles.first()) return message.reply('You must mention a role.')
        settings[key] = message.mentions.roles.first().id;
        this.client.settings.set(message.guild.id, settings);
        message.channel.send(`${key} successfully edited to \`${message.mentions.roles.first().name}\``);
        return;
      }
      
      settings[key] = value.join(' ');
      this.client.settings.set(message.guild.id, settings);
      message.channel.send(`${key} successfully edited to \`${value.join(' ')}\``);
    }
  }catch(error) {console.log(error)}
  }
}
module.exports = Setting;