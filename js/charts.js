const ChartsModule = (() => {
  let mainChart = null;
  const COLORS = [
    "#2563eb", "#dc2626", "#16a34a", "#ca8a04",
    "#7c3aed", "#ea580c", "#0891b2", "#be185d",
  ];

  function renderMainChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (mainChart) mainChart.destroy();

    const datasets = [];
    const columns = data.labels
      ? Object.keys(data.series)
      : [];

    columns.forEach((col, idx) => {
      datasets.push({
        label: col,
        data: data.series[col],
        borderColor: COLORS[idx % COLORS.length],
        backgroundColor: COLORS[idx % COLORS.length] + "15",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.1,
        spanGaps: true,
      });
    });

    mainChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyle: "circle",
              font: { family: "'Inter', system-ui, sans-serif", size: 12 },
            },
          },
          tooltip: {
            backgroundColor: "var(--color-bg-card)",
            titleColor: "var(--color-text)",
            bodyColor: "var(--color-text-secondary)",
            borderColor: "var(--color-border)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) {
                if (ctx.parsed.y === null) return null;
                return ctx.dataset.label + ": " + ctx.parsed.y.toFixed(2) + "%";
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 20,
              font: { size: 11 },
              color: "var(--color-text-secondary)",
            },
          },
          y: {
            grid: {
              color: "var(--color-border)",
              drawBorder: false,
            },
            ticks: {
              callback: function (value) {
                return value.toFixed(1) + "%";
              },
              font: { size: 11 },
              color: "var(--color-text-secondary)",
            },
          },
        },
      },
    });
  }

  function renderKPIs(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const columns = Object.keys(data.series);
    const latestRow = data.labels.length - 1;
    const html = [];

    columns.forEach((col) => {
      const values = data.series[col].filter((v) => v !== null);
      if (values.length === 0) return;

      const latest = data.series[col][latestRow];
      const maxVal = Math.max(...values);
      const minVal = Math.min(...values);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;

      html.push(`
        <div class="kpi-card" data-column="${col}">
          <h4 class="kpi-title">${col}</h4>
          <div class="kpi-value ${latest >= 0 ? 'positive' : 'negative'}">${latest !== null && latest !== undefined ? latest.toFixed(2) + '%' : '—'}</div>
          <div class="kpi-meta">
            <span data-i18n="rendimiento.kpi.maximo">M&aacute;ximo</span> <strong>${maxVal.toFixed(2)}%</strong>
            <span class="kpi-sep">·</span>
            <span data-i18n="rendimiento.kpi.minimo">M&iacute;nimo</span> <strong>${minVal.toFixed(2)}%</strong>
            <span class="kpi-sep">·</span>
            <span data-i18n="rendimiento.kpi.media">Media</span> <strong>${avg.toFixed(2)}%</strong>
          </div>
        </div>
      `);
    });

    container.innerHTML = html.join("");
  }

  function renderTable(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const columns = Object.keys(data.series);
    let html = `
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th data-i18n="rendimiento.fecha">Fecha</th>
              ${columns.map((c) => `<th>${c}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
    `;

    for (let i = data.labels.length - 1; i >= 0; i--) {
      html += `<tr><td>${data.labels[i]}</td>`;
      columns.forEach((col) => {
        const val = data.series[col][i];
        html += `<td class="${val !== null ? (val >= 0 ? 'positive' : 'negative') : ''}">${val !== null ? val.toFixed(2) + '%' : '—'}</td>`;
      });
      html += "</tr>";
    }

    html += `</tbody></table></div>`;
    container.innerHTML = html;
  }

  return { renderMainChart, renderKPIs, renderTable };
})();
