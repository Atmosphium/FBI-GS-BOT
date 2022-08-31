// ============================================================================================================================================================== \\

// Modüller

import { ButtonBuilder, ComponentType, ButtonStyle } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { DüğmeBileşeni } from '../interface/Bileşen'

import { Başarısız } from '../template/Gömü'

import { Cezalandır } from '../func/Cezalandır'

// ============================================================================================================================================================== \\

// İhracat

export const işlemİptali: DüğmeBileşeni = {
    Kimlik: 'işlemİptali',
    Çalıştır (Etkileşim, Değişkenler) {
        if (Etkileşim.user.id != Etkileşim.message.interaction?.user.id) return Etkileşim.reply ({
            embeds: [Başarısız ('Milletin işine ne karışıyo\'sunuz be?!')],
            ephemeral: true
        })
        
        Etkileşim.message.edit ({
            embeds: [Başarısız ('İşlem iptal edildi.')],
            components: [{
                type: ComponentType.ActionRow,
                components: [new ButtonBuilder ({
                    style: ButtonStyle.Danger,
                    customId: 'İptal',
                    label: 'İptal edildi.',
                    emoji: '🗑',
                    disabled: true
                })]
            }]
        })

        Etkileşim.deferReply ().then (() => Etkileşim.deleteReply ())
    }
}

// ============================================================================================================================================================== \\