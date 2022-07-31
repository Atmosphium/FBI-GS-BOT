module.exports = {
    emb: {
        err: (Etkileşim, İçerik) => require ('./embeds/başarısız') (Etkileşim, İçerik),
        suc: (Etkileşim, İçerik) => require ('./embeds/başarılı') (Etkileşim, İçerik),
        inf: (komutBaşlığı, Etkileşim, İçerik) => require ('./embeds/bilgi') (komutBaşlığı, Etkileşim, İçerik)
    },
    txt: {
        mmt: require ('./texts/an')
    }
}