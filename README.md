# The P2P Experience

> **ES** — Web estática informativa y editorial sobre inversión en préstamos P2P. Proyecto personal con seguimiento de rendimiento, fichas de plataformas, análisis y datos reales.
>
> **EN** — Informational static site about P2P lending investing. Personal project with performance tracking, platform profiles, analysis and real data.

## Versión / Version

**v0.1.9**

## Estructura del proyecto / Project structure

```
├── index.html            # Página principal (SPA) / Main page
├── css/
│   └── style.css         # Estilos completos (tema claro/oscuro, responsive)
├── js/
│   ├── config.js         # Configuración (plataformas, referidos, rutas)
│   ├── i18n.js           # Sistema de internacionalización / i18n system
│   ├── csv-loader.js     # Carga y parseo del CSV de rendimiento
│   ├── charts.js         # Gráficas con Chart.js / Charts with Chart.js
│   └── main.js           # Lógica principal (tema, nav, tabs, acordeones)
├── i18n/
│   ├── es.json           # Textos en español / Spanish texts
│   └── en.json           # Textos en inglés / English texts
├── img/
│   ├── logo.svg          # Logo (escudo + radar + P2P)
│   └── favicon.svg       # Favicon
├── data/
│   └── rendimiento.csv   # Datos de rendimiento mensual / Monthly performance data
├── .gitignore
└── README.md
```

## Despliegue / Deployment

**ES** — Desplegado en Cloudflare Pages. Cada push a `main` se despliega automáticamente.

**EN** — Deployed on Cloudflare Pages. Every push to `main` auto-deploys.

## Cómo mantener el sitio / How to maintain

### Cambiar enlaces de referido / Change referral links

**ES:** Abre `js/config.js` y edita la sección `referrals`.

**EN:** Open `js/config.js` and edit the `referrals` section.

```js
referrals: {
    mintos:  { url: "https://...", terms: "https://..." },
    bondora: { url: "https://...", terms: "https://..." },
    // ...
}
```

### Editar textos / Edit texts

**ES:** Los textos están en `i18n/es.json` y `i18n/en.json`. Busca la clave y edita el valor.

**EN:** Texts are in `i18n/es.json` and `i18n/en.json`. Find the key and edit the value.

### Añadir plataforma / Add a platform

1. Añadir entrada en `js/config.js` (`platforms` + `referrals`)
2. Añadir traducciones en `i18n/es.json` e `i18n/en.json` (claves `plataforma_*`)
3. Añadir HTML en `index.html` siguiendo el patrón existente

### Actualizar CSV / Update CSV

**ES:** Reemplaza `data/rendimiento.csv`. Formato: `Fecha,Plataforma1,Plataforma2,...` con datos mensuales.

**EN:** Replace `data/rendimiento.csv`. Format: `Date,Platform1,Platform2,...` with monthly data.

### Añadir idioma / Add a language

1. Crear `i18n/nuevo-idioma.json` (copiar `en.json` como base)
2. Añadir botón en el HTML: `<button class="lang-btn" data-lang="xx">XX</button>`

## Funcionalidades / Features

| ES | EN |
|---|---|
| Fichas de 7 plataformas P2P con información, riesgos y experiencia personal | Profiles of 7 P2P platforms with info, risks and personal experience |
| Sección Revolut y Kraken con información útil para inversores P2P | Revolut and Kraken sections with info useful for P2P investors |
| Gráfico interactivo de rendimiento (Chart.js) con selector de rango temporal | Interactive performance chart (Chart.js) with time range selector |
| Tabla histórica con paginación "Ver más / Ver menos" | Historical table with "Show more / Show less" pagination |
| KPIs: media, máximo, mínimo y último valor del periodo | KPIs: average, max, min and latest value for the period |
| Tema claro/oscuro automático y manual | Auto and manual light/dark theme |
| Internacionalización español/inglés | Spanish/English internationalization |
| Enlaces de referido con términos legales | Referral links with legal terms |
| Logo propio (escudo + radar + moneda P2P) y favicon SVG | Custom logo (shield + radar + P2P coin) and SVG favicon |
| Diseño responsive | Responsive design |

## Requisitos / Requirements

- Servidor web estático / Static web server
- Sin backend ni build tools / No backend or build tools needed
- Chart.js vía CDN (cargado desde `index.html`) / Chart.js via CDN (loaded from `index.html`)

## Disclaimer

> **ES** — Este sitio es un proyecto personal informativo. No constituye asesoramiento financiero. Algunos enlaces son de referido/afiliación.
>
> **EN** — This site is a personal informational project. It does not constitute financial advice. Some links are referral/affiliate links.
