// ============================================================================================================================================================== \\

// Modüller

import { ApplicationCommandAttachmentOption, ApplicationCommandBooleanOption, ApplicationCommandChannelOption, ApplicationCommandNumericOption, ApplicationCommandOptionType, ApplicationCommandRoleOption, ApplicationCommandStringOption, ApplicationCommandUserOption } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { KomutSayıSeçimleriYükle, KomutYazıSeçimleriYükle } from './KomutSeçenekSeçimleriYükle'

import { YazıSeçeneği, BooleSeçeneği, KullanıcıSeçeneği, KanalSeçeneği, SayıSeçeneği, DosyaSeçeneği } from '../interface/KomutSeçeneği'

// ============================================================================================================================================================== \\

// İhracat

export const AltKomutSeçenekleriYükle = (Seçenekler: Array <YazıSeçeneği | BooleSeçeneği | KullanıcıSeçeneği | KanalSeçeneği | SayıSeçeneği | DosyaSeçeneği>): Array <ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandNumericOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandUserOption> => {
    const Sonuç: Array <ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandNumericOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandUserOption> = []

    Seçenekler.forEach (Seçenek => {
        switch (Seçenek.Tür) {
            case ApplicationCommandOptionType.String:
                const yazıSeçimleri = Seçenek.Seçimler ? KomutYazıSeçimleriYükle (Seçenek) : []

                Sonuç.push ({
                    type: Seçenek.Tür,
                    name: Seçenek.Ad,
                    description: Seçenek.Açıklama,
                    choices: yazıSeçimleri,
                    required: Seçenek.Gerekli
                })

                break

            case ApplicationCommandOptionType.Number:
                const sayıSeçimleri = Seçenek.Seçimler ? KomutSayıSeçimleriYükle (Seçenek) : []

                Sonuç.push ({
                    type: Seçenek.Tür,
                    name: Seçenek.Ad,
                    description: Seçenek.Açıklama,
                    choices: sayıSeçimleri,
                    required: Seçenek.Gerekli
                })

                break
        
            default:
                Sonuç.push ({
                    type: Seçenek.Tür,
                    name: Seçenek.Ad,
                    description: Seçenek.Açıklama,
                    required: Seçenek.Gerekli
                })
                
                break
        }
    })

    return Sonuç
}

// ============================================================================================================================================================== \\