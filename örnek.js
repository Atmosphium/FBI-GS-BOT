const { ApplicationCommandOptionType } = require ('discord.js')
const { emb } = require ('./templates/şablonlar')

exports.eylem = (Uygulama, Etkileşim, Seçenekler) => {
    let Yanıt = `Aleyküm selam, ${Etkileşim.member}!`

    Seçenekler.get ('ad') ? Yanıt += ` Sana da selam, ${Seçenekler.get ('ad').value}!` : '' // Eğer 'ad' seçeneğinin geçerli bir değeri varsa yanıta o da eklensin.

    Etkileşim.reply ({
        embeds: [
            emb.inf (Uygulama, this.yapılandırma.başlık, Etkileşim, Yanıt)
        ],
        ephemeral: true
    })
}

exports.yapılandırma = {
    başlık: 'Esenleme',
    ad: 'selam',
    yerelAdlar: {
        'en-US': 'hello',
        'en-GB': 'hello',
        'ru': 'привет',
        'tr': 'selam'
    },
    açıklama: 'Robotu esenlersiniz.',
    yerelAçıklamalar: {
        'en-US': 'Delete the specified command.',
        'en-GB': 'Delete the specified command.',
        'ru': 'Удалить определявшую комманду.',
        'tr': 'Robotu esenlersiniz.'
    },
    seçenekler: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'ad',
            description: 'Esenleyen kişinin adı.',
            descriptionLocalizations: {
                'en-US': 'The ID of the command that will be removed.',
                'en-GB': 'The ID of the command that will be removed.',
                'ru': 'Удостоверение комманды которой будет удалена.',
                'tr': 'Esenleyen kişinin adı.'
            },
            required: false
        }
    ],
    yetki: ''
}