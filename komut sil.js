const { ApplicationCommandOptionType } = require ('discord.js')

exports.eylem = (Etkileşim, Seçenekler) => {
    Etkileşim.client.application.commands.fetch (Seçenekler.get ('kimlik').value).then (Komut => {
        Komut.delete ().then (() => {
            Etkileşim.reply (`${Komut.name}`)
        })
    })
}

exports.yapılandırma = {
    başlık: 'Komut Silme',
    ad: 'komutsil',
    açıklama: 'Belirttiğiniz komutu silersiniz.',
    seçenekler: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'kimlik',
            description: 'Tahtalıköyü boylayacak komutun kimliği (bkz. /komutkimlik).',
            required: true
        }
    ],
    yetki: 'GOD_TIER'
}