const { Colors, EmbedBuilder } = require ('discord.js')
const { txt } = require ('../şablonlar')

module.exports = (Etkileşim, İçerik) => new EmbedBuilder ({
    color: Colors.DarkRed,
    author: {
        name: `${Etkileşim.user.tag} tarafından kullanıldı`,
        iconURL: Etkileşim.member.displayAvatarURL ()
    },
    title: ':exclamation: Achtung! Achtung!',
    description: İçerik,
    footer: {
        text: Etkileşim.client.bilgi.ad + ' • ' + txt.mmt,
        iconURL: Etkileşim.client.user.displayAvatarURL ()
    }
})