// ============================================================================================================================================================== \\

// Modüller

import { ButtonInteraction, SelectMenuInteraction } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { DüğmeBileşenleri, MenüBileşenleri } from '../handler/Bileşenler'

import { Başarısız } from '../template/Gömü'

// ============================================================================================================================================================== \\

// İhracat

export const DüğmeÇalıştır = (Etkileşim: ButtonInteraction, Değişkenler: Array <any>) => {
    if (!DüğmeBileşenleri.find (Bileşen => Bileşen.Kimlik == Etkileşim.customId)) return Etkileşim.reply ({
        embeds: [Başarısız ('Bileşen tanımlaması bulunamadı.')],
        ephemeral: true
    })

    DüğmeBileşenleri.find (Bileşen => Bileşen.Kimlik == Etkileşim.customId)?.Çalıştır (Etkileşim, Değişkenler)
}

export const MenüÇalıştır = (Etkileşim: SelectMenuInteraction, Değişkenler: Array <any>) => {
    if (!MenüBileşenleri.find (Bileşen => Bileşen.Kimlik == Etkileşim.customId)) return Etkileşim.reply ({
        embeds: [Başarısız ('Bileşen tanımlaması bulunamadı.')],
        ephemeral: true
    })

    MenüBileşenleri.find (Bileşen => Bileşen.Kimlik == Etkileşim.customId)?.Çalıştır (Etkileşim, Değişkenler)
}

// ============================================================================================================================================================== \\