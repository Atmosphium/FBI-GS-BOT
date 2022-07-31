const { Colors, EmbedBuilder } = require ('discord.js')
const { txt } = require ('../şablonlar')

module.exports = (komutBaşlığı, Etkileşim, İçerik) => new EmbedBuilder ({
    color: Colors.DarkGreen,
    author: {
        name: `${Etkileşim.user.tag} tarafından kullanıldı`,
        iconURL: Etkileşim.member.displayAvatarURL ()
    },
    title: komutBaşlığı,
    description: İçerik,
    footer: {
        text: Etkileşim.client.bilgi.ad + ' • ' + txt.mmt,
        iconURL: Etkileşim.client.user.displayAvatarURL ()
    }
})