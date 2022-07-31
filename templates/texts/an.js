const Moment = require ('moment-timezone')

Moment.locale ('tr')

module.exports = Moment ().tz ('Europe/Istanbul').format ('D MMMM YYYY dddd, [saat] hh.mm A')