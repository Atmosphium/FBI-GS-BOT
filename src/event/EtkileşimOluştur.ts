// ============================================================================================================================================================== \\

// Modüller

import { Interaction, ChatInputCommandInteraction, InteractionResponse, InteractionType, ComponentType } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { SöyleşiBölümüGirdiKomutları } from '../handler/Komutlar'

import { Başarısız } from '../template/Gömü'

import { DüğmeÇalıştır, MenüÇalıştır } from '../func/BileşenÇalıştır'

// ============================================================================================================================================================== \\

// İhracat

export default (Etkileşim: Interaction): void | Promise <InteractionResponse> => {
    switch (Etkileşim.type) {
        case InteractionType.ApplicationCommand:
            if (Etkileşim.isChatInputCommand ()) {
                const komutEtkileşimi: ChatInputCommandInteraction = Etkileşim,
                      Komut = SöyleşiBölümüGirdiKomutları.find (Komut => Komut.Ad == komutEtkileşimi.commandName)
        
                if (!Komut) return komutEtkileşimi.reply ({
                    embeds: [Başarısız ('Komut sistemde bulunamadı.')],
                    ephemeral: true
                })
        
                return Komut.Çalıştır (komutEtkileşimi)
            }

            break

        case InteractionType.MessageComponent:
            switch (Etkileşim.componentType) {
                case ComponentType.Button:
                    DüğmeÇalıştır (Etkileşim, Etkileşim.message.embeds [1]?.description?.split (' ') ?? [Etkileşim.user.id])

                    break

                case ComponentType.SelectMenu:
                    MenüÇalıştır (Etkileşim, Etkileşim.values [0].split (' '))
                    break
            
                default:
                    break
            }

            break

        default:
            break
    }
}

// ============================================================================================================================================================== \\