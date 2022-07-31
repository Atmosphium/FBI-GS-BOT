const { CommandInteraction, CommandInteractionOptionResolver, ApplicationCommandOptionType, PermissionsBitField, Colors, EmbedBuilder } = require ('discord.js');
const { emb, txt } = require ('../templates/şablonlar')

const { writeFileSync, fstat } = require ('fs')

/**
 * 
 * @param { CommandInteraction } Etkileşim 
 * @param { CommandInteractionOptionResolver } Seçenekler 
 * @returns 
 */

exports.eylem = (Etkileşim, Seçenekler) => {
    Etkileşim.deferReply ().then(() => {
        const Kullanıcı = Seçenekler.get ('kullanıcı').user,
              uyarıKimlik = Seçenekler.get ('uyarıkimlik').value

    if (Kullanıcı.bot) return Etkileşim.reply ({
        embeds: [
            emb.err (Etkileşim, 'Botları kimse uyaramadığı için pek tabii uyarılarının da bir dizelgesinin mevcudiyeti namümkündür saygıdeğer hazret.')
        ]
    })

    const Uyarılar = require ('../data/uyarılar.json')

    const makulUyarı = Uyarılar [Kullanıcı.id].find (Uyarı => Uyarı.Kimlik == uyarıKimlik)

    if(!makulUyarı) return emb.err (Etkileşim, 'Bu kimlikle eşleşen uyarı bulunamadı.')

    Uyarılar [Kullanıcı.id] [Uyarılar [Kullanıcı.id].indexOf (makulUyarı)] = {}

    writeFileSync ('./data/uyarılar.json', JSON.stringify (Uyarılar), {  encoding: 'utf-8'})
        Etkileşim.editReply ({
            embeds: [emb.suc (Etkileşim, 'Uyarı başarıyla mahvedildi.')]
        })
    })

}

exports.yapılandırma = {
    başlık: 'Uyarı silme',
    ad: 'uyarısil',
    açıklama: 'Bir kullanıcının uyarısını silin.',
    seçenekler: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'uyarıkimlik',
            description: 'Silinecek uyarı',
            required: true
        },
        {
            type: ApplicationCommandOptionType.User,
            name: 'kullanıcı',
            description: 'Uyarısı silinecek kullanıcı',
            required: true
        }
    ],
    yetki: PermissionsBitField.Flags.KickMembers
}