// ============================================================================================================================================================== \\

// Dosyalar

import { Komut, SöyleşiBölümüGirdiKomutu } from '../interface/Komut'

import { AşkÖlçer } from '../cmd/Aşk Ölçer'
import { Kayıt } from '../cmd/Kayıt'
import { namazVakitleri } from '../cmd/Namaz Vakitleri'
import { Profil } from '../cmd/Profil'
import { Uyarı } from '../cmd/Uyarı'
import { Yardım } from '../cmd/Yardım'

// ============================================================================================================================================================== \\

// İhracat

export const SöyleşiBölümüGirdiKomutları: Array <SöyleşiBölümüGirdiKomutu> = [AşkÖlçer, Kayıt, namazVakitleri, Profil, Uyarı, Yardım]

export const Komutlar: Array <Komut> = SöyleşiBölümüGirdiKomutları

// ============================================================================================================================================================== \\