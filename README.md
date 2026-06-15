# The P2P Experience

Web estática informativa y editorial sobre inversión en préstamos P2P. Proyecto personal con seguimiento de rendimiento, fichas de plataformas, análisis y datos reales.

## Estructura del proyecto

```
├── index.html          # Página principal (única)
├── css/
│   └── style.css       # Estilos completos (tema claro/oscuro, responsive)
├── js/
│   ├── config.js       # Configuración central (plataformas, referidos, rutas)
│   ├── i18n.js         # Sistema de internacionalización
│   ├── csv-loader.js   # Carga y parseo del CSV de rendimiento
│   ├── charts.js       # Renderizado de gráficas (Chart.js)
│   └── main.js         # Lógica principal (tema, nav, tabs, acordeones)
├── i18n/
│   ├── es.json         # Textos en español
│   └── en.json         # Textos en inglés
├── data/
│   └── rendimiento.csv # Datos de rendimiento mensual
├── .gitignore
└── README.md
```

## Cómo mantener el sitio

### Cambiar enlaces de referido

Abre `js/config.js` y edita la sección `referrals`:

```js
referrals: {
    mintos: "https://tus-enlace-de-referido",
    bondora: "YOUR_BONDORA_REFERRAL_URL",
    // ...
}
```

Los valores que empiezan por `YOUR_` aparecerán desactivados en la web (no funcionales) hasta que los reemplaces con URLs reales.

### Editar textos

Los textos están centralizados en:
- Español: `i18n/es.json`
- Inglés: `i18n/en.json`

Busca la clave correspondiente a la sección que quieras modificar y edita el valor. No necesitas tocar el HTML.

### Desactivar una plataforma

En `js/config.js`, cambia `active: true` a `active: false` en la plataforma correspondiente:

```js
platforms: {
    loanch: {
        active: false,
        // ...
    },
}
```

La plataforma desaparecerá de la web automáticamente.

### Añadir una nueva plataforma

1. Añade la entrada en `CONFIG.platforms` en `js/config.js` con `active: true/false` y la URL oficial.
2. Añade el enlace de referido en `CONFIG.referrals`.
3. Añade las traducciones en `i18n/es.json` y `i18n/en.json` con las claves `plataforma_*`.
4. Añade el HTML de la ficha en `index.html`, siguiendo el mismo patrón que las existentes (con `data-platform`, `data-category`, y las secciones correspondientes).

### Actualizar el CSV de rendimiento

Reemplaza `data/rendimiento.csv` con tu archivo actualizado. La estructura esperada es:

```
Fecha,Plataforma1,Plataforma2,...
ene-24,"12,50%","8,30%",...
```

- Primera línea: cabecera con nombre de columnas (se ignora la primera celda).
- Segunda línea: nombres de plataformas.
- Resto: datos mensuales con formato `ene-24`, `"12,50%"` (usando coma decimal y %).
- Añadir una nueva fila = aparece automáticamente en la gráfica y la tabla.

### Añadir un idioma nuevo

1. Crea `i18n/nuevo-idioma.json` (copia `en.json` como base y tradúcelo).
2. Añade un botón en el HTML junto a los existentes: `<button class="lang-btn" data-lang="xx">XX</button>`.

### Disclaimer importante

Este proyecto usa contenido editorial con información verificable hasta donde es posible. Las opiniones personales están claramente marcadas. No constituye asesoramiento financiero.

## Requisitos

- Servidor web estático (Apache, Nginx, Netlify, Vercel, GitHub Pages...)
- No necesita backend ni build tools
- Chart.js cargado vía CDN (funciona offline si descargas la librería)

## Versión

v0.0.1
