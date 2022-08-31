// ============================================================================================================================================================== \\

// Modüller

import { Message, Colors, ThreadAutoArchiveDuration, ChannelType, BaseGuildTextChannel } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import Kanallar from '../config/Kanallar'

// ============================================================================================================================================================== \\

// İhracat

export default (İleti: Message) => {
    /*if (İleti.channel.type == ChannelType.DM) {
        console.log ('a')

        const Duyurular = İleti.client.channels.resolve ('779722612372799488') ?? İleti.channel

        if (Duyurular.type == ChannelType.GuildText) Duyurular.send (İleti.content)
    }*/

    switch (İleti.channelId) {
        case Kanallar.Görsel:
            İleti.startThread ({
                autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
                name: 'Alt Başlık',
                reason: 'Görsel kanala yazı yazmak yasaktır; bunun yerine alt başlılar kullanılmalıdır. Bot da kullanıcılar yerine bunu otomatikman yapmakta. ^^'
            }).then (altBaşlık => {
                altBaşlık.send ({
                    embeds: [{
                        color: Colors.Blurple,
                        author: {
                            icon_url: İleti.author.displayAvatarURL (),
                            name: `${İleti.author.tag} adlı kullanıcının iletisine binaen.`
                        },
                        title: 'Alt Başlık',
                        description: 'Kanala yazıldığında uyarı alınmasının önünü almak amacıyla alt başlık otomatikman oluşturuldu!',
                        footer: {
                            icon_url: İleti.client.user?.displayAvatarURL (),
                            text: 'FBI Gizli Servisi — Habbo\'nun ilk ve tek resmî şirketi!'
                        }
                    }]
                })
            })
            break
    
        default:
            break
    }
}

// ============================================================================================================================================================== \\