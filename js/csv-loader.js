const CSVLoader = (() => {
  let parsedData = null;
  let columnNames = [];

  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
    if (lines.length < 2) return null;

    const data = { labels: [], series: {} };

    const headerLine = lines[1];
    const headers = parseCSVLine(headerLine);
    columnNames = headers.slice(1);

    for (let i = 2; i < lines.length; i++) {
      const row = parseCSVLine(lines[i]);
      if (row.length < 2) continue;
      const label = row[0].trim();
      if (!label) continue;
      data.labels.push(label);

      for (let j = 0; j < columnNames.length; j++) {
        const colIdx = j + 1;
        const raw = row[colIdx] !== undefined ? row[colIdx].trim() : "";
        if (!data.series[columnNames[j]]) {
          data.series[columnNames[j]] = [];
        }
        if (raw === "" || raw === "-") {
          data.series[columnNames[j]].push(null);
        } else {
          const cleaned = raw
            .replace(/%/g, "")
            .replace(/,/g, ".")
            .replace(/\s/g, "");
          const val = parseFloat(cleaned);
          data.series[columnNames[j]].push(isNaN(val) ? null : val);
        }
      }
    }

    parsedData = data;
    return data;
  }

  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current);
    return result;
  }

  function loadCSV(path) {
    return fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error("CSV not found: " + path);
        return res.text();
      })
      .then((text) => {
        const data = parseCSV(text);
        if (!data) throw new Error("Failed to parse CSV");
        return data;
      });
  }

  function getData() {
    return parsedData;
  }

  function getColumns() {
    return columnNames;
  }

  return { parseCSV, loadCSV, getData, getColumns };
})();
