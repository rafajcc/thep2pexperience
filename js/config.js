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

  // ─── Referral links (edit these with your own URLs) ──────────
  // Format: "YOUR_PLATFORM_REFERRAL_URL"
  referrals: {
    mintos: "YOUR_MINTOS_REFERRAL_URL",
    bondora: "YOUR_BONDORA_REFERRAL_URL",
    twino: "YOUR_TWINO_REFERRAL_URL",
    maclear: "YOUR_MACLEAR_REFERRAL_URL",
    debitum: "YOUR_DEBITUM_REFERRAL_URL",
    loanch: "YOUR_LOANCH_REFERRAL_URL",
    "8lends": "YOUR_8LENDS_REFERRAL_URL",
    revolut: "YOUR_REVOLUT_REFERRAL_URL",
  },

  // ─── CSV data path ────────────────────────────────────────────
  csvPath: "data/rendimiento.csv",

  // ─── Site settings ────────────────────────────────────────────
  siteName: "The P2P Experience",
  defaultLang: "es",
  version: "0.0.2",
};
