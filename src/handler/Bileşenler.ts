// ============================================================================================================================================================== \\

// Dosyalar

import { Bileşen, DüğmeBileşeni, MenüBileşeni } from '../interface/Bileşen'

import { cezaOnama } from '../cmp/cezaOnama'
import { işlemİptali } from '../cmp/işlemİptali'
import { kayıtOnayla } from '../cmp/kayıtOnayla'
import { uyarıSil } from '../cmp/uyarıSil'

// ============================================================================================================================================================== \\

// İhracat

export const DüğmeBileşenleri: Array <DüğmeBileşeni> = [cezaOnama, işlemİptali, kayıtOnayla]
export const MenüBileşenleri: Array <MenüBileşeni> = [uyarıSil]

export const Bileşenler: Array <Bileşen> = [...DüğmeBileşenleri, ...MenüBileşenleri]

// ============================================================================================================================================================== \\