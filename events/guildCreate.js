module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(guild) {
    this.client.settings.set(guild.id, this.client.config.defaultSettings);
    await this.client.user.setGame(`${this.client.config.defaultSettings.prefix}help | ${guild.client.guilds.size} Servers`);
	this.client.guilds.get('358098380729221133').channels.get('358928336401203200').send(`Just joined the Server named - **${guild.name}(${guild.id})**, which is owned by **${guild.owner.tag}(${guild.owner.id})**\nNow I am in ${guild.client.guilds.size} Servers`);
  }
};