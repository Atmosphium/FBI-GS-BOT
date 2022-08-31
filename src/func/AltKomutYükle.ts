// ============================================================================================================================================================== \\

// Modüller

import { ApplicationCommandOptionType, ApplicationCommandSubCommand } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { AltKomutSeçenekleriYükle } from './AltKomutSeçenekleriYükle'

import { AltKomutSeçeneği } from '../interface/KomutSeçeneği'

// ============================================================================================================================================================== \\

// İhracat

export const AltKomutYükle = (AltKomut: AltKomutSeçeneği): ApplicationCommandSubCommand => {
    const altKomutSeçenekleri = AltKomut.Seçenekler,
          yüklenmişAltKomutSeçenekleri = altKomutSeçenekleri ? AltKomutSeçenekleriYükle (altKomutSeçenekleri) : []

    return {
        type: ApplicationCommandOptionType.Subcommand,
        name: AltKomut.Ad,
        description: AltKomut.Açıklama,
        options: yüklenmişAltKomutSeçenekleri
    }
}

// ============================================================================================================================================================== \\