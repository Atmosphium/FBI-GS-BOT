// ============================================================================================================================================================== \\

// Modüller

import { ApplicationCommandOptionData, ApplicationCommandOptionType } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { AltKomutYükle } from './AltKomutYükle'
import { AltKomutÖbeğiYükle } from './AltKomutÖbeğiYükle'
import { KomutYazıSeçimleriYükle, KomutSayıSeçimleriYükle } from './KomutSeçenekSeçimleriYükle'

import { KomutSeçeneği } from '../interface/KomutSeçeneği'

// ============================================================================================================================================================== \\

// İhracat

export const KomutSeçenekleriYükle = (Seçenekler: Array <KomutSeçeneği>): Array <ApplicationCommandOptionData> => {
    const Sonuç: Array <ApplicationCommandOptionData> = []

    Seçenekler.forEach (Seçenek => {
        switch (Seçenek.Tür) {
            case ApplicationCommandOptionType.Subcommand:
                Sonuç.push (AltKomutYükle (Seçenek))

                break

            case ApplicationCommandOptionType.SubcommandGroup:
                Sonuç.push (AltKomutÖbeğiYükle (Seçenek))

                break

            case ApplicationCommandOptionType.String:
                const yazıSeçimleri = Seçenek.Seçimler ? KomutYazıSeçimleriYükle (Seçenek) : []

                Sonuç.push ({
                    type: ApplicationCommandOptionType.String,
                    name: Seçenek.Ad,
                    description: Seçenek.Açıklama,
                    choices: yazıSeçimleri,
                    required: Seçenek.Gerekli ?? false
                })

                break
            
            case ApplicationCommandOptionType.User:
                Sonuç.push ({
                    type: ApplicationCommandOptionType.User,
                    name: Seçenek.Ad,
                    description: Seçenek.Açıklama,
                    required: Seçenek.Gerekli ?? false
                })
                
                break

            case ApplicationCommandOptionType.Number:
                const sayıSeçimleri = Seçenek.Seçimler ? KomutSayıSeçimleriYükle (Seçenek) : []

                Sonuç.push ({
                    type: ApplicationCommandOptionType.Number,
                    name: Seçenek.Ad,
                    description: Seçenek.Açıklama,
                    choices: sayıSeçimleri,
                    required: Seçenek.Gerekli ?? false
                })
                
                break
        
            default:
                break
        }
    })

    return Sonuç
}

// ============================================================================================================================================================== \\