const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!["796056210537054229", "796056220045541437", "796056229797429268"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  
const erkek = message.guild.roles.cache.find(r => r.id === "796056241893277766")
const xy = message.guild.roles.cache.find(r => r.id === "796056241960255489")
const cinsiyet = message.guild.roles.cache.find(r => r.id === "796056243281461248")
const kayıtsız = message.guild.roles.cache.find(r => r.id === "796056243386580992")
const reglog = message.guild.channels.cache.find(c => c.id === "796355174875660319")
const genelchat = message.guild.channels.cache.find(g => g.id === "796355174875660319")

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir Kullanıcı Belirt.`)
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`)
const x = message.guild.member(member)

let tag = "ϟ"
let isim = args[1]
let yas = Number(args[2])
if(!isim) return message.channel.send(`Bir İsim Belirt`)
if(!yas) return message.channel.send(`Bir Yaş Belirt`)

let bilgi = db.get(`yetkili.${member.id}`);  
db.add(`yetkili.${message.author.id}.erkek`,1 )
db.add(`yetkili.${message.author.id}.toplam`, 1)  
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

message.react('✅')
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(erkek)
x.roles.add(xy)
x.roles.add(cinsiyet)
x.roles.remove(kayıtsız)
//
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(erkek)
x.roles.add(xy)
x.roles.add(cinsiyet)
x.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let kayitli = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 



const embed = new Discord.MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı !`)
    .addField(`Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`Kayıt Edilen:`, `<@${member.id}> Kayıt Oldu`)
    .addField(`Verilen Rol:`, `<@&${erkek.id}> <@&${xy.id}> <@&${cinsiyet.id}> Rolleri Verildi`) 
    .addField(`Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
    .setImage("https://cdn.discordapp.com/attachments/740871896614043669/748878433840398367/Baslksz-1.png")
    .setThumbnail(message.author.avatarURL())
.setFooter(`LightArmy #Register`)
.setColor('RED')
client.channels.cache.get('796347524708696094').send(embed)

genelchat.send(`<@${member.id}>, Aramıza Hoş Geldin ! Umarım Keyifli Vakitler Geçirirsin.`)

const yardım = new Discord.MessageEmbed()
.setColor('RED')
.setDescription(``)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}

