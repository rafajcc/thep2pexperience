const I18n = (() => {
  let translations = {};
  let currentLang = CONFIG.defaultLang || "es";

  function loadLang(lang) {
    currentLang = lang;
    const url = `i18n/${lang}.json`;
    return fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        return res.json();
      })
      .then((data) => {
        translations = data;
        document.documentElement.lang = lang === "es" ? "es" : "en";
        translatePage();
      })
      .catch((err) => {
        console.warn("i18n error:", err);
      });
  }

  function t(key) {
    const keys = key.split(".");
    let val = translations;
    for (const k of keys) {
      if (!val || typeof val !== "object") return key;
      let idx = null;
      let prop = k;
      const match = k.match(/^([^\[]+)\[(\d+)\]$/);
      if (match) {
        prop = match[1];
        idx = parseInt(match[2], 10);
      }
      if (idx !== null && Array.isArray(val[prop])) {
        val = val[prop][idx];
      } else if (prop in val) {
        val = val[prop];
      } else {
        return key;
      }
    }
    return typeof val === "string" ? val : key;
  }

  function translatePage() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = t(key);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      el.alt = t(key);
    });
    document.title =
      t("site.title") + (currentLang === "es" ? "" : "");
  }

  function getLang() {
    return currentLang;
  }

  return { loadLang, t, translatePage, getLang };
})();
