const { CommandInteraction, CommandInteractionOptionResolver, ApplicationCommandOptionType, PermissionsBitField, Colors, EmbedBuilder } = require ('discord.js');
const { emb, txt } = require ('../templates/şablonlar')

const { writeFileSync } = require ('fs')

/**
 * 
 * @param { CommandInteraction } Etkileşim 
 * @param { CommandInteractionOptionResolver } Seçenekler 
 * @returns 
 */

exports.eylem = (Etkileşim, Seçenekler) => {
    Etkileşim.deferReply ().then(() => {
        const Kullanıcı = Seçenekler.get ('kullanıcı').user

    if (Kullanıcı.bot) return Etkileşim.editReply ({
        embeds: [
            emb.err (Etkileşim, 'Botları kimse uyaramadığı için pek tabii uyarılarının da bir dizelgesinin mevcudiyeti namümkündür saygıdeğer hazret.')
        ]
    })

    const Uyarılar = require ('../data/uyarılar.json')

    const makulUyarı = Uyarılar [Kullanıcı.id]

    if(!makulUyarı || makulUyarı == null || makulUyarı == undefined) return Etkileşim.editReply({embeds: [emb.err (Etkileşim, 'Bu kullanıcının uyarıları namevcut.')]})

    delete Uyarılar [Kullanıcı.id]

    writeFileSync ('./data/uyarılar.json', JSON.stringify (Uyarılar), {  encoding: 'utf-8'})

    Etkileşim.editReply ({
        embeds: [emb.suc (Etkileşim, 'Kullanıcının tüm uyarılarının başarıyla ırzına geçildi.')]
    })
    })
}

exports.yapılandırma = {
    başlık: 'Uyarı silme',
    ad: 'uyarılarısil',
    açıklama: 'Bir kullanıcının tüm uyarılarını silin.',
    seçenekler: [
        {
            type: ApplicationCommandOptionType.User,
            name: 'kullanıcı',
            description: 'Uyarısı silinecek kullanıcı',
            required: true
        }
    ],
    yetki: PermissionsBitField.Flags.KickMembers
}