const CONFIG = {

  // ─── Platform information ─────────────────────────────────────
  platforms: {
    mintos: {
      active: true,
      id: "mintos",
      officialUrl: "https://mintos.com",
    },
    bondora: {
      active: true,
      id: "bondora",
      officialUrl: "https://bondora.com",
    },
    twino: {
      active: true,
      id: "twino",
      officialUrl: "https://twino.com",
    },
    maclear: {
      active: true,
      id: "maclear",
      officialUrl: "https://maclear.com",
    },
    debitum: {
      active: true,
      id: "debitum",
      officialUrl: "https://debitum.com",
    },
    loanch: {
      active: true,
      id: "loanch",
      officialUrl: "https://loanch.com",
    },
    "8lends": {
      active: true,
      id: "8lends",
      officialUrl: "https://8lends.com",
    },
  },

  // ─── Referral links and terms ─────────────────────────────────
  // Replace placeholder codes below with your actual referral codes/URLs
  referrals: {
    mintos:  { url: "https://www.mintos.com/en/l/ref/3P7UZ9", terms: "https://www.mintos.com/en/mintos-referral-program/" },
    bondora: { url: "https://goandgrow.eu/ref/rafaelc53", terms: "https://goandgrow.eu/en/referral-terms-and-conditions/" },
    twino:   { url: "https://www.twino.eu/es/join-today?refer_friend=124969", terms: "https://www.twino.eu/en/legal" },
    maclear: { url: "https://app.maclear.ch/es/registration?ref=YOMWR9", terms: "https://www.maclear.ch/invite-friends" },
    debitum: { url: "https://debitum.investments/es/r/128DI", terms: "https://faq.debitum.investments/en/articles/13701255-what-is-a-friend-referral-bonus" },
    loanch:  { url: null, code: "ThpSr", terms: "https://loanch.com/docs/referral-program.pdf" },
    "8lends": { url: "https://app.8lends.io/es?referral=5QL06T", terms: "https://www.8lends.io/referral" },
    revolut: { url: "https://revolut.com/referral/?referral-code=rafael1ud!JUN1-26-AR-CRY&geo-redirect", terms: "https://www.revolut.com/legal/referrals-terms/" },
  },

  // ─── CSV data path ────────────────────────────────────────────
  csvPath: "data/rendimiento.csv",

  // ─── Site settings ────────────────────────────────────────────
  siteName: "The P2P Experience",
  defaultLang: "es",
  version: "0.0.4",
};
