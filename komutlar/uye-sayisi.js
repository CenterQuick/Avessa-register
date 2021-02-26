const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    let tag = 'ꖜ'
    const sayem = new Discord.RichEmbed()
        .setColor("RED")
    .setTitle(`Sunucu Durumu`)
        .addField("Sunucudaki üye sayısı :", message.guild.memberCount)
        .addField("Çevrimiçi üye sayısı :", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("Tagdaki üye sayısı :", message.guild.members.filter(m => m.user.username.includes(tag)).size)
    message.channel.send(sayem);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'durum',
    description: 'Say',
    usage: 'say'
};
