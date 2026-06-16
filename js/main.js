(function () {
  "use strict";

  // ─── Theme ─────────────────────────────────────────────────────
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      themeToggle.checked = theme === "dark";
    }
    if (themeLabel) {
      themeLabel.textContent =
        theme === "dark"
          ? I18n.t("theme.dark")
          : I18n.t("theme.light");
    }
  }

  const savedTheme = localStorage.getItem("theme") || getSystemTheme();
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      setTheme(this.checked ? "dark" : "light");
    });
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // ─── Language ──────────────────────────────────────────────────
  const langBtns = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    langBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    I18n.loadLang(lang).then(() => {
      if (themeLabel) {
        const theme = document.documentElement.getAttribute("data-theme") || "light";
        themeLabel.textContent =
          theme === "dark" ? I18n.t("theme.dark") : I18n.t("theme.light");
      }
    });
  }

  langBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      setLanguage(this.dataset.lang);
    });
  });

  setLanguage(CONFIG.defaultLang);

  // ─── Mobile nav ────────────────────────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("open");
      });
    });
  }

  // ─── Smooth scroll ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ─── Sticky nav ────────────────────────────────────────────────
  const header = document.querySelector(".site-header");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    if (header) {
      if (currentScroll > 80) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    lastScroll = currentScroll;
  });

  // ─── Platform tabs ─────────────────────────────────────────────
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const parent = this.closest(".platform-tabs");
      if (!parent) return;
      parent.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter;
      document.querySelectorAll(".platform-card").forEach((card) => {
        if (filter === "all") {
          card.style.display = "";
        } else {
          card.style.display =
            card.dataset.category === filter ? "" : "none";
        }
      });
    });
  });

  // ─── Platform accordion ────────────────────────────────────────
  document.querySelectorAll(".platform-card").forEach((card) => {
    const toggle = card.querySelector(".platform-toggle");
    const content = card.querySelector(".platform-content");
    const header = card.querySelector(".platform-header");
    if (toggle && content) {
      function toggleCard() {
        const isOpen = card.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen);
        content.style.maxHeight = isOpen ? content.scrollHeight + "px" : "0";
      }
      toggle.addEventListener("click", toggleCard);
      if (header) {
        header.addEventListener("click", function (e) {
          if (e.target.closest(".platform-toggle, a, button")) return;
          toggleCard();
        });
      }
    }
  });

  // ─── FAQ accordion ─────────────────────────────────────────────
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (question && answer) {
      question.addEventListener("click", function () {
        const isOpen = item.classList.toggle("open");
        this.setAttribute("aria-expanded", isOpen);
        answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : "0";
      });
    }
  });

  // ─── CSV loading ───────────────────────────────────────────────
  const perfSection = document.getElementById("rendimiento");
  if (perfSection) {
    const loaderEl = document.getElementById("csv-loading");
    const errorEl = document.getElementById("csv-error");
    const chartContainer = document.getElementById("chart-container");
    const kpiContainer = document.getElementById("kpi-container");
    const tableContainer = document.getElementById("table-container");

    CSVLoader.loadCSV(CONFIG.csvPath)
      .then((data) => {
        if (loaderEl) loaderEl.style.display = "none";
        if (chartContainer) {
          ChartsModule.renderMainChart("main-chart", data);
        }
        if (kpiContainer) {
          ChartsModule.renderKPIs("kpi-container", data);
        }
        if (tableContainer) {
          ChartsModule.renderTable("table-container", data);
        }
      })
      .catch((err) => {
        console.error("CSV error:", err);
        if (loaderEl) loaderEl.style.display = "none";
        if (errorEl) errorEl.style.display = "block";
      });
  }

  // ─── Referral link generation ──────────────────────────────────
  document.querySelectorAll("[data-referral]").forEach((el) => {
    const platform = el.dataset.referral;
    const ref = CONFIG.referrals[platform];
    if (!ref) {
      el.textContent = I18n.t("plataformas.no_disponible");
      el.href = "#";
      el.style.opacity = "0.4";
      el.style.pointerEvents = "none";
      return;
    }
    // Handle referral with code (no direct URL)
    if (ref.code) {
      el.textContent = "Código: " + ref.code;
      el.href = "#";
      el.style.cursor = "text";
      el.style.textDecoration = "none";
      return;
    }
    if (ref.url) {
      el.href = ref.url;
    } else {
      el.textContent = I18n.t("plataformas.no_disponible");
      el.href = "#";
      el.style.opacity = "0.4";
      el.style.pointerEvents = "none";
    }
  });

  // ─── Referral terms links ──────────────────────────────────────
  document.querySelectorAll("[data-referral-terms]").forEach((el) => {
    const platform = el.dataset.referralTerms;
    const ref = CONFIG.referrals[platform];
    if (ref && ref.terms) {
      el.href = ref.terms;
    } else {
      el.style.display = "none";
    }
  });

  // ─── Show referral benefit text on cards ───────────────────────
  document.querySelectorAll("[data-referral-benefit]").forEach((el) => {
    const platform = el.dataset.referralBenefit;
    const key = "plataforma_" + platform + ".referido_beneficio";
    const text = I18n.t(key);
    if (text !== key) {
      el.textContent = text;
      el.style.display = "block";
    }
  });

  // ─── Platform active/inactive ──────────────────────────────────
  document.querySelectorAll("[data-platform]").forEach((el) => {
    const platformId = el.dataset.platform;
    const pConfig = CONFIG.platforms[platformId];
    if (pConfig && !pConfig.active) {
      el.style.display = "none";
    }
  });

  console.log("The P2P Experience loaded. v" + (CONFIG.version || "0.0.1"));
})();
