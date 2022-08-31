// ============================================================================================================================================================== \\

// Modüller

import { ButtonInteraction, SelectMenuInteraction } from 'discord.js'

// ============================================================================================================================================================== \\

// İhracat

export interface TemelBileşen {
    Kimlik: string,
    Çalıştır: (Etkileşim: any, Değişkenler: Array <any>) => void
}

export interface DüğmeBileşeni extends TemelBileşen {
    Çalıştır: (Etkileşim: ButtonInteraction, Değişkenler: Array <any>) => void
}

export interface MenüBileşeni extends TemelBileşen {
    Çalıştır: (Etkileşim: SelectMenuInteraction, Değişkenler: Array <any>) => void
}

export type Bileşen = DüğmeBileşeni | MenüBileşeni

// ============================================================================================================================================================== \\