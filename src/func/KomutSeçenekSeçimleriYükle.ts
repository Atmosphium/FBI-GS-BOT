// ============================================================================================================================================================== \\

// Modüller

import { ApplicationCommandOptionChoiceData } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { YazıSeçeneği, SayıSeçeneği } from '../interface/KomutSeçeneği'

// ============================================================================================================================================================== \\

// İhracat

export const KomutYazıSeçimleriYükle = (Seçenek: YazıSeçeneği): Array <ApplicationCommandOptionChoiceData <string>> => {
    const Sonuç: Array <ApplicationCommandOptionChoiceData <string>> = []

    Seçenek.Seçimler?.forEach (Seçim => {
        Sonuç.push ({
            name: Seçim.Ad,
            value: Seçim.Değer
        })
    })

    return Sonuç
}

export const KomutSayıSeçimleriYükle = (Seçenek: SayıSeçeneği): Array <ApplicationCommandOptionChoiceData <number>> => {
    const Sonuç: Array <ApplicationCommandOptionChoiceData <number>> = []

    Seçenek.Seçimler?.forEach (Seçim => {
        Sonuç.push ({
            name: Seçim.Ad,
            value: Seçim.Değer
        })
    })

    return Sonuç
}

// ============================================================================================================================================================== \\