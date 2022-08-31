// ============================================================================================================================================================== \\

// Modüller

import { ApplicationCommandOptionType, ApplicationCommandSubCommand, ApplicationCommandSubGroup } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { AltKomutYükle } from './AltKomutYükle'

import { AltKomutÖbeğiSeçeneği } from '../interface/KomutSeçeneği'

// ============================================================================================================================================================== \\

// İhracat

export const AltKomutÖbeğiYükle = (AltKomutÖbeği: AltKomutÖbeğiSeçeneği): ApplicationCommandSubGroup => {
    const altKomutlar = AltKomutÖbeği.Seçenekler,
          yüklenmişAltKomutlar: Array <ApplicationCommandSubCommand> = []

    altKomutlar.forEach (altKomut => {
        yüklenmişAltKomutlar.push (AltKomutYükle (altKomut))
    })

    return {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: AltKomutÖbeği.Ad,
        description: AltKomutÖbeği.Açıklama,
        options: yüklenmişAltKomutlar
    }
}

// ============================================================================================================================================================== \\