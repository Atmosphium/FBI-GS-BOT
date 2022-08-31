// ============================================================================================================================================================== \\

// Modüller

import { Client, ActivityOptions, ApplicationCommandOptionData, ActivityType } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { KomutSeçenekleriYükle } from '../func/KomutSeçenekleriYükle'

import { SöyleşiBölümüGirdiKomutları } from '../handler/Komutlar'

import Kanallar from '../config/Kanallar'

// ============================================================================================================================================================== \\

// İhracat

export default async (İstemci: Client) => {
    const doğrulamaKanalı = İstemci.channels.resolve (Kanallar.Doğrulama)
    
    doğrulamaKanalı?.isTextBased () ? await doğrulamaKanalı.messages.fetch ('615903503407120394') : ''

    SöyleşiBölümüGirdiKomutları.forEach (Komut => {
        const Seçenekler: Array <ApplicationCommandOptionData> = Komut.Seçenekler ? KomutSeçenekleriYükle (Komut.Seçenekler) : []

        İstemci.application?.commands.create ({
            type: 1,
            name: Komut.Ad,
            description: Komut.Açıklama,
            options: Seçenekler
        }).then (yaratılanKomut => {
            console.log (`▫ ${yaratılanKomut.name} adlı bir komut sisteme eklendi! \nVar olan komut sayısı: ${İstemci.application?.commands.cache.size}`)
        })
    })

    console.info ('🌟 FBI Gizli Servisi TS uygulaması anlık olarak etkin!')
    
    const Etkinlikler: Array <ActivityOptions> = [
        {
            type: ActivityType.Playing,
            name: 'Habbo'
        },
        {
            type: ActivityType.Watching,
            name: 'Olup Biteni'
        },
        {
            type: ActivityType.Listening,
            name: 'Aygıtlarınızı'
        }
    ]

    setInterval (() => {
        const Etkinlik: ActivityOptions = Etkinlikler [Math.floor (Math.random () * Etkinlikler.length)]

        İstemci.user?.setPresence ({
            activities: [Etkinlik]
        })
    }, 15000)
}

// ============================================================================================================================================================== \\