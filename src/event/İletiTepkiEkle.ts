// ============================================================================================================================================================== \\

// Modüller

import { MessageReaction, User, PartialMessageReaction, PartialUser } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import Emojiler from '../config/Emojiler'
import Roller from '../config/Roller'

// ============================================================================================================================================================== \\

// İhracat

export default async (Tepki: MessageReaction | PartialMessageReaction, Kullanıcı: User | PartialUser) => {
    switch (Tepki.emoji) {
        case Tepki.client.emojis.resolve (Emojiler.FBI):
            if (!Tepki.message.guild?.members.resolve (Kullanıcı.id)?.roles.cache.has (Roller.Doğrulama)) return

            Tepki.message.guild?.members.resolve (Kullanıcı.id)?.roles.remove (Roller.Doğrulama)
            Tepki.message.guild?.members.resolve (Kullanıcı.id)?.roles.add (Roller.YeniÜye)

            break
    
        default:
            break
    }
}

// ============================================================================================================================================================== \\