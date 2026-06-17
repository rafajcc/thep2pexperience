# The P2P Experience

---

## 🇪🇸 Español

Web estática informativa y editorial sobre inversión en préstamos P2P. Proyecto personal con seguimiento de rendimiento, fichas de plataformas, análisis y datos reales.

### Versión

v0.2.0

### Estructura del proyecto

```
├── index.html            # Página principal (SPA)
├── css/
│   └── style.css         # Estilos completos (tema claro/oscuro, responsive)
├── js/
│   ├── config.js         # Configuración (plataformas, referidos, rutas)
│   ├── i18n.js           # Sistema de internacionalización
│   ├── csv-loader.js     # Carga y parseo del CSV de rendimiento
│   ├── charts.js         # Gráficas con Chart.js
│   └── main.js           # Lógica principal (tema, nav, tabs, acordeones)
├── i18n/
│   ├── es.json           # Textos en español
│   └── en.json           # Textos en inglés
├── img/
│   ├── logo.svg          # Logo (escudo + radar + P2P)
│   └── favicon.svg       # Favicon
├── data/
│   └── rendimiento.csv   # Datos de rendimiento mensual
├── .gitignore
└── README.md
```

### Despliegue

Desplegado en Cloudflare Pages. Cada push a `main` se despliega automáticamente.

### Cómo mantener

#### Cambiar enlaces de referido

Abre `js/config.js` y edita la sección `referrals`:

```js
referrals: {
    mintos:  { url: "https://...", terms: "https://..." },
    bondora: { url: "https://...", terms: "https://..." },
    // ...
}
```

#### Editar textos

Los textos están en `i18n/es.json` (español) e `i18n/en.json` (inglés). Busca la clave y edita el valor.

#### Añadir una plataforma

1. Añadir entrada en `js/config.js` (`platforms` + `referrals`)
2. Añadir traducciones en `i18n/es.json` e `i18n/en.json` (claves `plataforma_*`)
3. Añadir HTML en `index.html` siguiendo el patrón existente

#### Actualizar el CSV de rendimiento

Reemplaza `data/rendimiento.csv`. Formato esperado:

```
Fecha,Plataforma1,Plataforma2,...
ene-24,"12,50%","8,30%",...
```

Primera línea: cabecera. Segunda línea: nombres de plataformas. Resto: datos mensuales.

#### Añadir un idioma

1. Crear `i18n/nuevo-idioma.json` (copiar `en.json` como base y traducir)
2. Añadir botón en el HTML: `<button class="lang-btn" data-lang="xx">XX</button>`

### Funcionalidades

- Fichas de 7 plataformas P2P con información, riesgos y experiencia personal
- Secciones Revolut y Kraken con información útil para inversores P2P
- Gráfico interactivo de rendimiento (Chart.js) con selector de rango temporal
- Tabla histórica con paginación "Ver más / Ver menos"
- KPIs: media del periodo, máximo, mínimo y último valor
- Tema claro/oscuro automático y manual
- Internacionalización español/inglés
- Enlaces de referido con términos legales
- Logo propio (escudo + radar + moneda P2P) y favicon SVG
- Diseño responsive

### Requisitos

- Servidor web estático (Apache, Nginx, Cloudflare Pages, GitHub Pages…)
- Sin backend ni build tools
- Chart.js vía CDN (cargado desde `index.html`)

### Disclaimer

Este sitio es un proyecto personal informativo. No constituye asesoramiento financiero. Algunos enlaces son de referido/afiliación.

---

## 🇬🇧 English

Informational static site about P2P lending investing. Personal project with performance tracking, platform profiles, analysis and real data.

### Version

v0.2.0

### Project structure

```
├── index.html            # Main page (SPA)
├── css/
│   └── style.css         # Complete styles (light/dark theme, responsive)
├── js/
│   ├── config.js         # Configuration (platforms, referrals, paths)
│   ├── i18n.js           # Internationalization system
│   ├── csv-loader.js     # CSV loading and parsing
│   ├── charts.js         # Charts with Chart.js
│   └── main.js           # Main logic (theme, nav, tabs, accordions)
├── i18n/
│   ├── es.json           # Spanish texts
│   └── en.json           # English texts
├── img/
│   ├── logo.svg          # Logo (shield + radar + P2P coin)
│   └── favicon.svg       # Favicon
├── data/
│   └── rendimiento.csv   # Monthly performance data
├── .gitignore
└── README.md
```

### Deployment

Deployed on Cloudflare Pages. Every push to `main` auto-deploys.

### How to maintain

#### Change referral links

Open `js/config.js` and edit the `referrals` section:

```js
referrals: {
    mintos:  { url: "https://...", terms: "https://..." },
    bondora: { url: "https://...", terms: "https://..." },
    // ...
}
```

#### Edit texts

Texts are in `i18n/es.json` (Spanish) and `i18n/en.json` (English). Find the key and edit the value.

#### Add a platform

1. Add entry in `js/config.js` (`platforms` + `referrals`)
2. Add translations in `i18n/es.json` and `i18n/en.json` (keys `plataforma_*`)
3. Add HTML in `index.html` following the existing pattern

#### Update performance CSV

Replace `data/rendimiento.csv`. Expected format:

```
Fecha,Plataforma1,Plataforma2,...
ene-24,"12,50%","8,30%",...
```

First row: header. Second row: platform names. Rest: monthly data.

#### Add a language

1. Create `i18n/new-language.json` (copy `en.json` as base and translate)
2. Add button in HTML: `<button class="lang-btn" data-lang="xx">XX</button>`

### Features

- Profiles of 7 P2P platforms with info, risks and personal experience
- Revolut and Kraken sections with info useful for P2P investors
- Interactive performance chart (Chart.js) with time range selector
- Historical table with "Show more / Show less" pagination
- KPIs: period average, max, min and latest value
- Auto and manual light/dark theme
- Spanish/English internationalization
- Referral links with legal terms
- Custom logo (shield + radar + P2P coin) and SVG favicon
- Responsive design

### Requirements

- Static web server (Apache, Nginx, Cloudflare Pages, GitHub Pages…)
- No backend or build tools needed
- Chart.js via CDN (loaded from `index.html`)

### Disclaimer

This site is a personal informational project. It does not constitute financial advice. Some links are referral/affiliate links.

---

*The P2P Experience — Proyecto personal sin ánimo comercial / Personal non-commercial project.*
