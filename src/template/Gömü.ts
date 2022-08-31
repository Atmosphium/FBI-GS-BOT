// ============================================================================================================================================================== \\

// Modüller

import { EmbedBuilder, Colors } from 'discord.js'

// ============================================================================================================================================================== \\

// İhracat

export const Başarılı = (İçerik: string): EmbedBuilder => {
    return new EmbedBuilder ({
        color: Colors.DarkGreen,
        title: 'İşlem başarılı!',
        description: İçerik,
        footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/646701400084185093/0e8b40b92a10819f62200c9545ef0a50',
            text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
        }
    })
}

export const Başarısız = (İçerik: string): EmbedBuilder => {
    return new EmbedBuilder ({
        color: Colors.DarkRed,
        title: 'Bir şeyler ters gitti..!',
        description: İçerik,
        footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/646701400084185093/0e8b40b92a10819f62200c9545ef0a50',
            text: 'FBI Gizli Servisi — Habbo Türkiye\'nin ilk ve tek resmî şirketi!'
        }
    })
}

// ============================================================================================================================================================== \\