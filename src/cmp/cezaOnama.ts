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

export const cezaOnama: DüğmeBileşeni = {
    Kimlik: 'cezaOnama',
    Çalıştır (Etkileşim, Değişkenler) {
        if (Etkileşim.user.id != Değişkenler [0]) return Etkileşim.reply ({
            embeds: [Başarısız ('Milletin işine ne karışıyo\'sunuz be?!')]
        })

        return Etkileşim.deferReply ().then (ertelenmişYanıt => {
            Cezalandır (Etkileşim.client.users.resolve (Değişkenler [1])).then (Sonuç => {
                Etkileşim.message.edit ({
                    embeds: [Sonuç],
                    components: [{
                        type: ComponentType.ActionRow,
                        components: [new ButtonBuilder ({
                            style: ButtonStyle.Success,
                            customId: 'Onandı',
                            label: 'Onaylandı.',
                            emoji: '✅',
                            disabled: true
                        })]
                    }]
                })

                Etkileşim.deleteReply ()
            })
        })
    }
}

// ============================================================================================================================================================== \\