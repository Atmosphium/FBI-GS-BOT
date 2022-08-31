// ============================================================================================================================================================== \\

// Modüller

import { ChatInputCommandInteraction, UserContextMenuCommandInteraction, MessageContextMenuCommandInteraction, ApplicationCommandType } from 'discord.js'

// ============================================================================================================================================================== \\

// Dosyalar

import { KomutSeçeneği } from './KomutSeçeneği'
import { KomutKategorisi } from '../enum/KomutKategorisi'

// ============================================================================================================================================================== \\

// İhracat

export interface TemelKomut {
    Tür: ApplicationCommandType,
    Ad: string,
    Kategori: KomutKategorisi
}

export interface SöyleşiBölümüGirdiKomutu extends TemelKomut {
    Tür: ApplicationCommandType.ChatInput,
    Açıklama: string,
    Seçenekler?: Array <KomutSeçeneği>,
    Çalıştır: (Etkileşim: ChatInputCommandInteraction) => void
}

export interface KullanıcıKomutu extends TemelKomut {
    Tür: ApplicationCommandType.User,
    Çalıştır: (Etkileşim: UserContextMenuCommandInteraction) => void
}

export interface İletiKomutu extends TemelKomut {
    Tür: ApplicationCommandType.Message,
    Çalıştır: (Etkileşim: MessageContextMenuCommandInteraction) => void
}

export type Komut = SöyleşiBölümüGirdiKomutu | KullanıcıKomutu | İletiKomutu

// ============================================================================================================================================================== \\